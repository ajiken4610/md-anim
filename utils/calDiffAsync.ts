import { diffChars } from "diff";
export default async (src: string, dst: string) => diffChars(src, dst);
