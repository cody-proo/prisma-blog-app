export interface ICreateBlogBody {
  title: string;
  description: string;
}

export interface IUpdateBlogBody extends Partial<ICreateBlogBody> {}
