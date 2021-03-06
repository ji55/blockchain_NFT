import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import JoinAlert from "../../join/JoinAlert";

function UpdateTable() {
  const [memberId, setMemberId] = useState<string>("");
  const [memberPw, setMemberPw] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [memberPwCheck, setMemberPwCheck] = useState<number>(0);
  const [Nick, setNick] = useState<string>("");
  const [memberNick, setMemberNick] = useState<string>("");
  const [nickCheck, setNickCheck] = useState<number>(1);
  const [Email, setEmail] = useState<string>("");
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<number>(1);
  const [checkEmail, setCheckEmail] = useState<boolean>(true);
  const [likeCeleb, setLikeCeleb] = useState<number>(999);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("/api/member/mypage", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setMemberId(res.data.mypage.memberId);
        setMemberNick(res.data.mypage.memberNick);
        setNick(res.data.mypage.memberNick);
        setMemberEmail(res.data.mypage.memberEmail);
        setEmail(res.data.mypage.memberEmail);
        setLikeCeleb(res.data.mypage.celebNo);
      });
  }, []);

  const handleMemberPw = (e: string) => {
    if (
      e
        .trim()
        .match(
          /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,16}$/
        )
    ) {
      setMemberPwCheck(1);
      setMemberPw(e);
    } else {
      setMemberPwCheck(2);
    }
  };

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleMemberNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberNick(e.target.value.trim());
    if (memberNick !== e.target.value) {
      setNickCheck(0);
    }
  };

  const handleNickCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (memberNick.trim()) {
      axios
        .post("/api/member/checkNick", { memberNick: memberNick })
        .then((res) => {
          if (res.data.success) {
            setMessage("?????? ????????? ??????????????????");
            setNickCheck(1);
            setOpen(true);
          } else {
            setNickCheck(2);
          }
        });
    } else {
      setMessage("???????????? ????????? ?????????");
      setOpen(true);
    }
  };

  const handleMemberEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberEmail(e.target.value.trim());
    if (
      memberEmail.match(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[com]{2,3}$/
      )
    ) {
      setCheckEmail(true);
      if (memberEmail !== e.target.value) {
        setEmailCheck(0);
      }
    } else {
      setCheckEmail(false);
    }
  };

  const handleEmailCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      memberEmail
        .trim()
        .match(
          /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
        )
    ) {
      axios
        .post("/api/member/checkEmail", { memberEmail: memberEmail })
        .then((res) => {
          if (res.data.success) {
            setMessage("?????? ????????? ??????????????????");
            setEmailCheck(1);
            setOpen(true);
          } else {
            setEmailCheck(2);
          }
        });
    } else {
      setMessage("???????????? ????????? ?????????");
      setOpen(true);
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (memberEmail && memberNick) {
      if (memberPw === password2) {
        if (emailCheck === 1 && nickCheck === 1) {
          if (!memberPw.trim()) {
            axios
              .put(
                "/api/member/update",
                {
                  memberPw: null,
                  memberEmail: memberEmail,
                  memberNick: memberNick,
                  celebNo: likeCeleb,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              )
              .then((res) => {
                setMessage("????????? ??????????????????");
                setOpen(true);
              });
            axios
              .put(
                "/api/member/update",
                {
                  memberPw: memberPw,
                  memberEmail: memberEmail,
                  memberNick: memberNick,
                  celebNo: likeCeleb,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              )
              .then((res) => {
                setMessage("????????? ??????????????????");
                setOpen(true);
                window.location.replace("/mypage");
              });
          } else {
            if (memberPwCheck === 1) {
              axios
                .put(
                  "/api/member/update",
                  {
                    memberPw: memberPw,
                    memberEmail: memberEmail,
                    memberNick: memberNick,
                    celebNo: likeCeleb,
                  },
                  {
                    headers: { Authorization: localStorage.getItem("token") },
                  }
                )
                .then((res) => {
                  setMessage("????????? ??????????????????");
                  setOpen(true);
                });
            } else {
              setMessage("???????????? ????????? ????????? ?????????");
              setOpen(true);
            }
          }
        } else {
          setMessage("?????? ????????? ??? ?????????");
          setOpen(true);
        }
      } else {
        setMessage("??????????????? ???????????? ????????????");
        setOpen(true);
      }
    } else {
      setMessage("?????? ?????? ???????????? ????????? ?????????");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <JoinAlert message={message} handleClose={handleClose} open={open} />
      ) : null}
      <table className="joinTable">
        <h1>UPDATE</h1>
        <tbody>
          <tr id="joinId">
            <th>
              <span className="require">???</span>
              <span>?????????</span>
            </th>
            <td>
              <p>{memberId}</p>
            </td>
          </tr>
          <tr id="joinPw1">
            <th>
              <span className="require">???</span>
              <span>????????????</span>
            </th>
            <td>
              <TextField
                id="standard-basic"
                type="password"
                helperText="??????/??????/????????????, 8~16???"
                error={memberPwCheck === 2 ? true : false}
                onChange={(e) => handleMemberPw(e.target.value)}
                inputProps={{
                  maxlength: 16,
                }}
              />
            </td>
          </tr>
          <tr id="joinPw2">
            <th>
              <span className="require">???</span>
              <span>???????????? ??????</span>
            </th>
            <td>
              <TextField
                id="standard-basic"
                type="password"
                onChange={handlePassword2}
                helperText={
                  memberPw !== password2 ? "??????????????? ???????????? ????????????" : ""
                }
                error={memberPw !== password2 ? true : false}
              />
            </td>
          </tr>
          <tr id="joinNick">
            <th>
              <span className="require">???</span>
              <span>?????????</span>
            </th>
            <td>
              <TextField
                id="standard-basic"
                value={memberNick}
                onChange={handleMemberNick}
                helperText={nickCheck === 2 ? "?????? ???????????? ??????????????????" : ""}
                error={nickCheck === 2 ? true : false}
              />
              <Button
                className="joinCheckBtn"
                variant="outlined"
                size="small"
                onClick={handleNickCheck}
                disabled={nickCheck === 1 ? true : false}
              >
                ?????? ??????
              </Button>
            </td>
          </tr>
          <tr id="joinNick">
            <th>
              <span className="require">???</span>
              <span>?????????</span>
            </th>
            <td>
              <TextField
                id="standard-basic"
                type="email"
                value={memberEmail}
                onChange={handleMemberEmail}
                helperText={
                  checkEmail
                    ? emailCheck === 2
                      ? "?????? ???????????? ??????????????????"
                      : ""
                    : "???????????? ?????? ???????????????"
                }
                error={checkEmail ? (emailCheck === 2 ? true : false) : true}
              />

              <Button
                className="joinCheckBtn"
                variant="outlined"
                size="small"
                onClick={handleEmailCheck}
                disabled={emailCheck === 1 ? true : false}
              >
                ?????? ??????
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="joinSelectCeleb">
        <div className="joinCelebInfo">
          <span className="require">???</span>
          <span>CELEB ??????</span>
          <span className="joinCelebSubInfo">
            ???????????? CELEB??? ????????? ?????????
          </span>
        </div>
        <div className="joinCelebBoxs">
          <div
            className="joinCelebBox joinKim"
            onClick={() => setLikeCeleb(0)}
            style={{
              backgroundColor:
                likeCeleb === 0 ? "rgba(95, 0, 247, 0.329)" : undefined,
            }}
          >
            ??????
          </div>
          <div
            className="joinCelebBox joinTi"
            onClick={() => setLikeCeleb(1)}
            style={{
              backgroundColor:
                likeCeleb === 1 ? "rgba(248, 10, 248, 0.329)" : undefined,
            }}
          >
            ?????????
          </div>
          <div
            className="joinCelebBox joinSeo"
            onClick={() => setLikeCeleb(2)}
            style={{
              backgroundColor:
                likeCeleb === 2 ? "rgb(241, 162, 13, 0.329)" : undefined,
            }}
          >
            ??????
          </div>
          <div
            className="joinCelebBox joinHyun"
            onClick={() => setLikeCeleb(3)}
            style={{
              backgroundColor:
                likeCeleb === 3 ? "rgba(235, 12, 49, 0.329)" : undefined,
            }}
          >
            ??????
          </div>
          <div
            className="joinCelebBox joinGd"
            onClick={() => setLikeCeleb(4)}
            style={{
              backgroundColor:
                likeCeleb === 4 ? "rgba(235, 231, 12, 0.329)" : undefined,
            }}
          >
            G-DRAGON
          </div>
          <div
            className="joinCelebBox joinIu"
            onClick={() => setLikeCeleb(5)}
            style={{
              backgroundColor:
                likeCeleb === 5 ? "rgba(176, 235, 12, 0.329)" : undefined,
            }}
          >
            ?????????
          </div>
        </div>
      </div>
      <div className="joinBtns">
        <Link to="/mypage" style={{ textDecoration: "none" }}>
          <Button className="joinCancelBtn" variant="contained">
            ??????
          </Button>
        </Link>
        <Button
          className="joinBtn"
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          ??????
        </Button>
      </div>
    </div>
  );
}

export default UpdateTable;
