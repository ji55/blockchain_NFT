import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "./CardPackDetail.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardPackInside from "../cardpackshop/CardPackInside";
import Review from "../cardpackshop/CardpackReviewList";
import BuyCardPack from "../cardpackshop/BuyCardPack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
    },
    container: {
      width: "60%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    paper2: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    footer: {},
  })
);

function CardPackDetail(): JSX.Element {
  const classes = useStyles();
  const location: any = useLocation();
  console.log(location.state.data);
  let [islike, setislike] = useState(false);
  const [likepeople, setlikepeople] = useState(0);
  useEffect(() => {
    // follow check axios
    console.log(location.state.data.salesNo);
    axios
      .get(`/api/cardPack/likecheck/${location.state.data.salesNo}`, {
        salesNo: location.state.data.salesNo,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setlikepeople(res.data.peoplelike);
        // true면 true, false면 false
        if (res.data.islike === true) {
          setislike(true);
        } else {
          setislike(false);
        }
      })
      .catch();
  });

  // like, unlike
  const changelike = () => {
    console.log(islike);
    if (islike) {
      axios
        .post(
          "/api/cardPack/like",
          {
            cardpackPK: location.state.data.salesNo,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setislike(false);
        });
    } else {
      axios
        .post(
          "/api/cardPack/like",
          {
            cardpackPK: location.state.data.salesNo,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setislike(true);
        });
    }
  };
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <img src="/images/card.gif" alt="" width="20%" />
          </Grid>
          <Grid item xs={12}>
            <h2>{location.state.data.salesNM}</h2>
            <Tooltip title={likepeople} placement="right-start">
              {islike ? (
                <ShoppingCartIcon
                  onClick={changelike}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <AddShoppingCartIcon
                  onClick={changelike}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Tooltip>
            <div>
              <div className={classes.footer}>
                <BuyCardPack />
              </div>
              <div className={classes.paper2}>
                <hr />
                <div>
                  <CardPackInside />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Review cardpackNo={location.state.data.salesNo} />
    </div>
  );
}

export default CardPackDetail;
