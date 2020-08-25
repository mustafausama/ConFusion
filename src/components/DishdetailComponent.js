import React from "react";
import { Component } from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    name="rating"
                    model=".rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    name="author"
                    id="author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    id="comment"
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </FormGroup>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <span class="fa fa-pencil" /> Submit Comment
        </Button>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  if (dish)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  return <div />;
}

function RenderComments({ comments, addComment, dishId }) {
  const coms = comments.map((comment) => {
    return (
      <div className="container">
        <li id={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author} ,{" "}
            {new Date(comment.date).toLocaleString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </li>
      </div>
    );
  });
  return (
    <div className="col-12 col-md-5 m1">
      <h4>Comments</h4>
      <ul className="list-unstyled">{coms}</ul>
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
