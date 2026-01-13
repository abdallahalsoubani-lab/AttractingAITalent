import { NextRequest, NextResponse } from 'next/server'

// Hardcoded credentials for now (will be replaced with DB lookup later)
const validCredentials = {
  email: 'demo@example.com',
  password: 'demo123',
}

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line no-console
    console.log('[API] Signin request received')

    const body = await request.json()
    // eslint-disable-next-line no-console
    console.log('[API] Request body parsed:', { email: body.email, passwordLength: body.password?.length })

    const { email, password } = body

    // Validate input
    if (!email || !password) {
      // eslint-disable-next-line no-console
      console.log('[API] Missing email or password')
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate credentials
    if (email === validCredentials.email && password === validCredentials.password) {
      // eslint-disable-next-line no-console
      console.log('[API] Credentials matched, generating user token')
      return NextResponse.json(
        {
          success: true,
          user: {
            id: '1',
            email: email,
            name: 'Demo User',
            role: 'HR_SPECIALIST',
          },
        },
        { status: 200 }
      )
    }

    // eslint-disable-next-line no-console
    console.log('[API] Invalid credentials provided')
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('[API] Error in signin endpoint:', error)
    return NextResponse.json(
      { success: false, message: 'Server error: ' + error?.message },
      { status: 500 }
    )
  }
}
