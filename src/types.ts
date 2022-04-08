export type StrapiResponse<T = any> =
  | {
      data: T;
      meta: any;
      error: undefined;
    }
  | {
      data: undefined;
      meta: any;
      error: {
        details: {
          errors: Array<{ path: string[]; message: string; name: string }>;
        };
        message: string;
        name: string;
        status: number;
      };
    };
