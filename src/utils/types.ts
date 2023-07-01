export type PatchProfile = (
  id: string,
  data: FormData
  // data: {
  //   [k: string]: FormDataEntryValue;
  // }
) => Promise<any>;
