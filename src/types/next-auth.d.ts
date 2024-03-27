import { UserDocument } from "@/models/User";
import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: UserDocument;
    }
}