import { NextRequest, NextResponse } from 'next/server'

// Hardcoded credentials for now (will be replaced with DB lookup later)
const validCredentials = {
  email: 'demo@example.com',
  password: 'demo123',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate credentials
    if (email === validCredentials.email && password === validCredentials.password) {
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

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
