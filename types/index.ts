export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
