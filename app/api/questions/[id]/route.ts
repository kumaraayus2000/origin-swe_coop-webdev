import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    switch (id) {
        case '1':
            return NextResponse.json([{ name: 'John Doe' }, { name: 'Dave Smith' }]);
        default:
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Hello, world!' });
}