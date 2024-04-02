import { UserDocument } from "@/models/PrivateUser";
import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: UserDocument;
    }
}