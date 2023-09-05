import { useState, useCallback, Fragment } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommentList from "./Comment";
import axios from "axios";
import "./Post.scss";

const ITEM_HEIGHT = 48;

const SettingMenu = ({ user, writer, id }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`/api/post/${id}`).then(() => {
        alert("삭제되었습니다");
        location.reload();
      });
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {user.id === writer.id && (
          <div>
            <MenuItem onClick={() => navigate(`/edit/${id}`)}>
              <EditIcon />
              수정하기
            </MenuItem>
            <MenuItem onClick={deletePost}>
              <DeleteIcon />
              삭제하기
            </MenuItem>
          </div>
        )}
        <MenuItem>신고</MenuItem>
        <MenuItem>스크랩하기</MenuItem>
      </Menu>
    </div>
  );
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({
  id,
  title,
  content,
  img,
  createdAt,
  comments,
  likeCount,
  user,
  writer,
  setReload,
  isDetail,
}) {
  const [expanded, setExpanded] = useState(false);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const imgSrc = img.map((aimg) => `${serverUrl}${aimg}`);

  const prevSlide = () => {
    setSlide(slide === 0 ? imgSrc.length - 1 : slide - 1);
  };

  const nextSlide = () => {
    setSlide(slide === imgSrc.length - 1 ? 0 : slide + 1);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDetailClick = useCallback(async () => {
    navigate(`/detail/${id}`);
  }, [id, navigate]);
  const addLike = useCallback(async () => {
    if (user.id > 0) {
      await axios.put(`/api/post/likes/${id}`).then(() => {
        setReload(true);
      });
    }
  }, [id, setReload, user]);
  return (
    <div className="postDetail">
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
              {writer.nick}
            </Avatar>
          }
          action={
            <SettingMenu user={user} writer={writer} id={id}></SettingMenu>
          }
          title={title}
          subheader={createdAt}
        />
        {img.join().length > 0 && (
          <CardMedia>
            <div className="carousel">
              <ArrowBackIosIcon
                className="arrow prevArrow"
                onClick={prevSlide}
              />
              {imgSrc.map((imgUrl, idx) => (
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt="content Image"
                  loading="lazy"
                  className={slide === idx ? "slide" : "slide slide-hidden"}
                  onClick={handleDetailClick}
                />
              ))}
              <ArrowForwardIosIcon
                className="arrow nextArrow"
                onClick={nextSlide}
              />
              <span className="indicators">
                {imgSrc.map((_, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => setSlide(idx)}
                      className={
                        slide === idx
                          ? "indicator"
                          : "indicator indicator-inactive"
                      }
                    ></button>
                  );
                })}
              </span>
            </div>
          </CardMedia>
        )}
        <CardContent onClick={handleDetailClick}>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => addLike()}>
            <FavoriteIcon /> {likeCount}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {!isDetail && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
        {!isDetail && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Comment:</Typography>
              <CommentList
                comments={comments}
                user={user}
                id={id}
                setReload={setReload}
              ></CommentList>
            </CardContent>
          </Collapse>
        )}
      </Card>
      {isDetail && (
        <>
          <p>댓글</p>
          <CommentList
            comments={comments}
            user={user}
            id={id}
            setReload={setReload}
          ></CommentList>
        </>
      )}
    </div>
  );
}
