"use server";

import { requireAdmin } from "@/data/admin/verify-admin";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type UserRoleProps = {
  userId: string;
  role: "user" | "admin" | ("user" | "admin")[];
};

type BanUser = {
  userId: string;
  banReason?: string;
};

export async function setUserRole(
  values: UserRoleProps
): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    await auth.api.setRole({
      body: {
        userId: values.userId,
        role: values.role,
      },

      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      status: "success",
      message: "User role changed successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to change user role",
    };
  }
}

export async function BanUserAction(
  values: BanUser
): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    await auth.api.banUser({
      body: {
        userId: values.userId, // required
        banReason: values.banReason ?? "Spamming",
        banExpiresIn: 60 * 60 * 24 * 7,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      status: "success",
      message: "User Banned successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to ban user",
    };
  }
}

export async function unBanUserAction(
  userId: string
): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    await auth.api.unbanUser({
      body: {
        userId: userId,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      status: "success",
      message: "User unBanned successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to unban user",
    };
  }
}

export async function RevokeUserSessions(
  userId: string
): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    await auth.api.revokeUserSessions({
      body: {
        userId: userId, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      status: "success",
      message: "User Session revoked successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to revoke user session",
    };
  }
}

export async function RemoveUser(userId: string): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    await auth.api.removeUser({
      body: {
        userId: userId,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      status: "success",
      message: "User Removed/Deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to Removed/Deleted",
    };
  }
}
