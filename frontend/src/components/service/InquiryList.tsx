import React, { useState, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CreateIcon from "@mui/icons-material/Create";
import Review from "../cardpack/Review";
import Pagination from "../cardpack/Pagination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      width: "100%",
      maxWidth: "1000px",
      margin: "auto",
      marginTop: "10px",
      // maxHeight: 300,
    },
    inline: {
      display: "inline",
    },
    margin: {
      width: "100%",
      maxWidth: "900px",
      margin: "auto",
    },
    container: {
      width: "800px",
      margin: "auto",
    },
    createicon: {
      cursor: "pointer",
    },
  })
);

function InquiryList(props: any) {
  const classes = useStyles();

  const [reviews, setreviews] = useState<any[]>([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [reviewsPerPage, setreviewsPerPage] = useState(10);

  useEffect(() => {
    // 내 문의사항 가져오기
    const fetchReviews = async () => {
      const res = await axios
        .get(`/api/cardPack/${props.cardpackNo}/review`, {
          cardpackNo: props.cardpackNo,
        })
        .then((res) => {
          setreviews(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchReviews();
  });
  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const paginate = (pageNumber: any) => setcurrentPage(pageNumber);

  let [inq, setinq] = useState<string>("");
  // 문의남기기
  function createinquiry() {
    axios
      .post(
        `/api/`,
        {
          inquiryContent: inq,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        setinq("");
      })
      .catch();
  }
  return (
    <div>
      <h1>1:1 Service</h1>
      <Pagination
        reviewsPerPage={reviewsPerPage}
        totalReviews={reviews.length}
        paginate={paginate}
      />
      <div className={classes.root1}>
        <TextField
          id="standard-basic"
          label="문의사항을 남겨주세요"
          variant="standard"
          style={{ width: "700px" }}
          value={inq}
          onChange={(e) => {
            setinq(e.target.value);
          }}
        />
        <CreateIcon
          fontSize="large"
          className={classes.createicon}
          onClick={() => {
            createinquiry();
          }}
        />
        <Container className={classes.container}>
          <Review reviews={currentReviews} />
          <p>문의사항 테이블</p>
        </Container>
      </div>
    </div>
  );
}

export default InquiryList;