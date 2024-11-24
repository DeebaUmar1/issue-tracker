import { AuthOptions } from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  
  // Validate user if assignedToUserId is provided
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  // Validate if the issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  // Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Validate if the issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  // Delete the issue
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
