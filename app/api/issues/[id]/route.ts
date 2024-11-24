import { AuthOptions } from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;  // Adjusted to match the expected type
  searchParams: Promise<{ [key: string]: string }>;
}

export async function PATCH(
  request: NextRequest,
  {
    params,
    searchParams,
  }: Props
) {
  const resolvedSearchParams = await params;
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json(
        { error: "Invalid user." },
        { status: 400 }
      );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedSearchParams.id) },
  });
  if (!issue)
    return NextResponse.json(
      { error: "Invalid issue" },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
    searchParams,
  }: Props
) {
  const resolvedSearchParams = await params;
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedSearchParams.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Invalid issue" },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}