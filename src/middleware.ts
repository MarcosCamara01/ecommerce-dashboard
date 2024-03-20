export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/analytics", "/customers", "/orders", "/products"] };