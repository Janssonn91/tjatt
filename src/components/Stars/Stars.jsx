<div>{this.props.userStore.myStars.map(star => {
  return (<div key={star._id}>{star.text}</div>)
})}</div>