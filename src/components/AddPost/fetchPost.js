const addNewComment = (data) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
    method: 'POST',
    mode: 'CORS',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
    return res;
  }).catch(err => err);
}

export default addNewComment;
