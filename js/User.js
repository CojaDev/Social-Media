class User {
  user_id = '';
  username = '';
  email = '';
  password = '';
  followers = 0;
  posts = 0;
  api_url = 'https://64deffe971c3335b2581fa0d.mockapi.io';

  create() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
      followers: this.followers,
      posts: this.posts,
    };
    data.followers = 0;
    data.posts = 0;
    data = JSON.stringify(data);

    fetch(this.api_url + '/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Korisnik Kreiran!');
        this.posts = 0;
        this.followers = 2;
        console.log(this.posts);
        console.log(this.followers);
        let session = new Session();
        session.user_id = data.id;
        session.startSession();

        window.location.href = 'hexa.html';
      });
  }
  async get(user_id) {
    let api_url = this.api_url + '/Users/' + user_id;

    let response = await fetch(api_url);
    let data = await response.json();
    return data;
  }
  edit() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    data = JSON.stringify(data);
    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + '/Users/' + session_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = 'hexa.html';
      });
  }
  login() {
    fetch(this.api_url + '/Users')
      .then((response) => response.json())
      .then((data) => {
        let login_successful = 0;
        data.forEach((db_user) => {
          if (
            db_user.email === this.email &&
            db_user.password === this.password
          ) {
            let session = new Session();
            session.user_id = db_user.id;
            session.startSession();
            login_successful = 1;
            window.location.href = 'hexa.html';
          }
        });
        if (login_successful === 0) {
          alert('Pogresan email ili lozinka');
        }
      });
  }
  delete() {
    let session = new Session();
    session_id = session.getSession();

    fetch(this.api_url + '/Users/' + session_id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();

        window.location.href = '/';
      });
  }

  postUpdate(session_id, posts) {
    console.log(posts);
    let data = {
      posts: posts,
    };

    data = JSON.stringify(data);
    fetch(this.api_url + '/Users/' + session_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {});
  }
}
