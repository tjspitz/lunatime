export type PatchProfile = (
  id: string,
  // data: FormData
  data: {
    [k: string]: FormDataEntryValue;
  }
) => Promise<any>;

export type ReqOptions = {
  [k: string]: RequestCache;
}
