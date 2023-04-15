import { rest } from "msw";

export const handlers = [
  rest.get("/api/v1/auth/profile", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.json({
        id: "1",
        full_name: "Vladimir Buchatskyi",
      })
    );
  }),
  rest.get("/api/v1/requests", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(100),
      ctx.json({
        items: [
          {
            id: "1",
            customer: {
              id: "1",
              full_name: "Vladimir Buchatskyi",
            },
            city_from: "nikolaev",
            city_to: "budva",
            type: "gadgets",
            dispatch_date: "2023-07-15",
            description: "",
            parcel_type: "deliver",
            create_at: "2023-02-14",
          },
          {
            id: "2",
            customer: {
              id: "2",
              full_name: "Vladimir Temnik",
            },
            city_from: "nikolaev",
            city_to: "budva",
            type: "drinks",
            dispatch_date: "2023-07-16",
            description: "",
            parcel_type: "order",
            create_at: "2023-02-13",
          },
        ],
        page: 1,
        limit: 10,
        total: 2,
      })
    );
  }),
];
