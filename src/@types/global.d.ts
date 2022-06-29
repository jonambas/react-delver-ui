declare const __delverConfig: Record<any, any>;

declare module '__delverData' {
  export type Props = Array<{
    value: string | boolean | number;
    name: string;
  }>;

  export type Instance = {
    name: string;
    spread: boolean;
    props: Props;
    from?: string;
    location: {
      file: string;
      line: number;
      character: number;
    };
  };

  export type ProcessedResult = {
    name: string;
    count: number;
    instances: Array<Instance>;
    // Enriched properties
    from?: string;
    module: boolean;
  };

  export type Row = ProcessedResult;
  export type Data = Array<Row>;

  const data: Data;
  export default data;
}
