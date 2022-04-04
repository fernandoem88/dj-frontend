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
        details: Object;
        message: string;
        name: string;
        status: number;
      };
    };
