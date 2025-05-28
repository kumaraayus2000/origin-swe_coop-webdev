import { NextRequest, NextResponse } from 'next/server'

// Mock data - in a real app, this would come from a database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
]

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  
  let filteredUsers = users
  if (role) {
    filteredUsers = users.filter(user => user.role === role)
  }
  
  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString()
  })
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role = 'user' } = body
    
    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    // Create new user
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role
    }
    
    users.push(newUser)
    
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: newUser,
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/users - Delete all users (for testing purposes)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const confirm = searchParams.get('confirm')
  
  if (confirm !== 'true') {
    return NextResponse.json(
      { error: 'Add ?confirm=true to delete all users' },
      { status: 400 }
    )
  }
  
  const deletedCount = users.length
  users = []
  
  return NextResponse.json({
    message: `Deleted ${deletedCount} users`,
    timestamp: new Date().toISOString()
  })
} 