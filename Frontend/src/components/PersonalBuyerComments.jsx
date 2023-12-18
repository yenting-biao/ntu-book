import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  rating,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

const TABLE_HEAD = ["Listed Books", "Order Placed Date", "Rating", "Comment"];

export default function PersonalBuyerComments({ userFullProfile }) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState();

  useEffect(() => {
    if (userFullProfile) {
      if (userFullProfile.Ratings?.length === 0) {
        setTABLE_ROWS(null);
      } else {
        setTABLE_ROWS(userFullProfile.Ratings);
      }
    }
  }, [userFullProfile]);

  return (
    <Card className="max-h-[70vh] m-8 w-[80vw]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Ratings
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are Ratins received from buyers.
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map(
              ({ img, title, amount, date, rating, comment }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={title}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={img}
                          alt={title}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-fit p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {title}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Rating name="read-only" value={rating} readOnly />
                    </td>
                    <td className={classes}>
                      <article className="flex flex-wrap w-80">
                        {comment}
                      </article>
                    </td>
                  </tr>
                );
              }
            )}
            {!TABLE_ROWS && (
              <tr>
                <td className="p-4 text-center" colSpan={6}>
                  <Typography color="gray">No Ratings yet.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
