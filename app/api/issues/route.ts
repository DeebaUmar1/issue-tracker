import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchemas";
import { AuthOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";

export async function POST(request : NextRequest)
{
    const session = await getServerSession(AuthOptions)
    if(!session) return NextResponse.json({}, {status : 401})
    const body = await request.json();
    const validation = await createIssueSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status : 400});

    const newIssue =  await prisma.issue.create({
        data: {
            title : body.title,
            description : body.description
        }
    });
    
    return NextResponse.json(newIssue, {status : 201});
}