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
            dispatch_date: "4.14.2023",
            description: "",
            parcel_type: "order",
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
            dispatch_date: "4.14.2023",
            description: "",
            parcel_type: "order",
          },
        ],
        page: 1,
        limit: 10,
        total: 2,
      })
    );
  }),
  // rest.get("/api/v1/parcel/:id/requests", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.delay(100),
  //     ctx.json({
  //       items: [
  //         {
  //           id: "1",
  //           customer: {
  //             id: "1",
  //             full_name: "Vladimir Buchatskyi",
  //           },
  //           city_from: "nikolaev",
  //           city_to: "budva",
  //           type: "gadgets",
  //           dispatch_date: "4.14.2023",
  //           description: "",
  //           parcel_type: "order",
  //         },
  //         {
  //           id: "1",
  //           customer: {
  //             id: "1",
  //             full_name: "Vladimir Buchatskyi",
  //           },
  //           city_from: "nikolaev",
  //           city_to: "budva",
  //           type: "drinks",
  //           dispatch_date: "4.14.2023",
  //           description: "",
  //           parcel_type: "order",
  //         },
  //       ],
  //       page: 1,
  //       limit: 10,
  //       total: 2,
  //     })
  //   );
  // }),
  // rest.post("/api/v1/parcel", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.delay(100),
  //     ctx.json({
  //       customer: {
  //         id: "1",
  //         full_name: "Vladimir Buchatskyi",
  //       },
  //       city_from: "nikolaev",
  //       city_to: "budva",
  //       type: "drinks",
  //       create_at: "",
  //       dispatch_date: "4.14.2023",
  //       description: "",
  //       parcel_type: "order",
  //     })
  //   );
  // }),
  // rest.patch("/api/v1/parcel", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.delay(100),
  //     ctx.json({
  //       customer: {
  //         id: "1",
  //         full_name: "Vladimir Buchatskyi",
  //       },
  //       city_from: "nikolaev",
  //       city_to: "budva",
  //       type: "drinks",
  //       create_at: "",
  //       dispatch_date: "4.14.2023",
  //       description: "",
  //       parcel_type: "order",
  //     })
  //   );
  // }),
  // rest.delete(
  //   "/api/v1/shops/:id/upload-certificate-of-incorporate",
  //   (req, res, ctx) => {
  //     return res(ctx.status(200), ctx.delay(100), ctx.json(null));
  //   }
  // ),
];
