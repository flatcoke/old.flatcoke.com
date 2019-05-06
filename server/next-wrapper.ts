export const nextHandlerWrapper = (app: any) => {
  const handler = app.getRequestHandler()
  return async ({ raw, url }: { raw: any; url: any }, h: any) => {
    await handler(raw.req, raw.res, url)
    return h.close
  }
}
export const defaultHandlerWrapper = (app: any) => async ({
  raw: { req, res },
  url,
}: {
  raw: any
  url: any
}) => {
  const { pathname, query } = url
  return app.renderToHTML(req, res, pathname, query)
}

export const pathWrapper = (app: any, pathName: any, opts?: any) => async ({
  raw,
  query,
  params,
}: {
  raw: any
  query: any
  params: any
}) => {
  return app.renderToHTML(
    raw.req,
    raw.res,
    pathName,
    { ...query, ...params },
    opts
  )
}
