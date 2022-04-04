export type StrapiResponse<T = any> =
  | {
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      error: {
        details: Object;
        message: string;
        name: string;
        status: number;
      };
    };
