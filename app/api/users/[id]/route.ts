import { NextRequest, NextResponse } from 'next/server'

// Mock data - in a real app, this would come from a database
// Note: This should be shared with the main users route, ideally in a separate data layer
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
]

// GET /api/users/[id] - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: 'Invalid user ID' },
      { status: 400 }
    )
  }
  
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({
    user,
    timestamp: new Date().toISOString()
  })
}

// PUT /api/users/[id] - Update a specific user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }
    
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    const { name, email, role } = body
    
    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Check if email already exists (excluding current user)
    const existingUser = users.find(user => user.email === email && user.id !== userId)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      role: role || users[userIndex].role
    }
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: users[userIndex],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)
  
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: 'Invalid user ID' },
      { status: 400 }
    )
  }
  
  const userIndex = users.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  const deletedUser = users[userIndex]
  users.splice(userIndex, 1)
  
  return NextResponse.json({
    message: 'User deleted successfully',
    deletedUser,
    timestamp: new Date().toISOString()
  })
} 