export default class TweetService {
  tweets = [
    {
      id: 1,
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
  ];

  async getTweets(username) {
    
    const result = username
      ? fetch(`http://127.0.0.1:8080/tweets?username=${username}`,{method:'GET'}).then(res=>res.json())
      : fetch(`http://127.0.0.1:8080/tweets`,{method:'GET'}).then(res=>res.json());
    
      return result;
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: 'Ellie',
      username: 'ellie',
      text,
    }

    let test = fetch(`http://127.0.0.1:8080/tweets`,{method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify(tweet)})
    .then(res=>res.json());

    console.log(test);

    return tweet;
  }

  async deleteTweet(tweetId) {
    fetch(`http://127.0.0.1:8080/tweets/${tweetId}`,{method:'DELETE'}).then(res=>res.json())
  }

  async updateTweet(tweetId, text) {
    const tweet = await fetch(`http://127.0.0.1:8080/tweets/${tweetId}`,{method:'GET'}).then(res=>res.json());
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    let test = await fetch(`http://127.0.0.1:8080/tweets/${tweetId}`,
      {
        method:'PUT',
        headers:{'Content-Type':'apllication/json'},
        body:JSON.stringify({tweet})
      }
    )
    .then(res=>res.json());

    return tweet;
  }
}

// 외부 api와의 연결이 의미하는 것
// 나도 모르겠다. 각 서버에서 하나의 DB에 crud하는것과 뭐가 다르지?
// api를 변경할때 api서버에서만 변경하면 되는 것? => 통일시키는것?