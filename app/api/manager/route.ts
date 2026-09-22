import { NextResponse } from "next/server";

type ManagerRequest = {
  task?: string;
};

export async function POST(request: Request) {
  try {
    const body: ManagerRequest = await request.json();

    const task = body.task?.trim();

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task is required.",
        },
        { status: 400 }
      );
    }

    // Temporary AI Manager routing logic.
    // Real AI APIs will be connected in later steps.

    const lowerTask = task.toLowerCase();

    let agent = "AI Manager";
    let role = "Orchestrator";

    if (
      lowerTask.includes("code") ||
      lowerTask.includes("coding") ||
      lowerTask.includes("develop") ||
      lowerTask.includes("website") ||
      lowerTask.includes("app") ||
      lowerTask.includes("program")
    ) {
      agent = "Claude";
      role = "Developer";
    } else if (
      lowerTask.includes("design") ||
      lowerTask.includes("creative") ||
      lowerTask.includes("logo") ||
      lowerTask.includes("ui") ||
      lowerTask.includes("brand")
    ) {
      agent = "Gemini";
      role = "Creative Director";
    } else if (
      lowerTask.includes("research") ||
      lowerTask.includes("find") ||
      lowerTask.includes("analyze") ||
      lowerTask.includes("analysis") ||
      lowerTask.includes("market")
    ) {
      agent = "Research Agent";
      role = "Research Analyst";
    }

    return NextResponse.json({
      success: true,
      manager: "AI Manager",
      task,
      assignedAgent: agent,
      role,
      status: "Assigned",
      message: `Task assigned to ${agent}.`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request.",
      },
      { status: 400 }
    );
  }
}