/**
 * 
 * 함수를 만드는 것과 클래스를 만드는 것의 차이는?
 * -> 클래스로 만들면 재사용이 가능하다.
 * 
 * 얘가 http를 import받아서 쓰면 그만 아닌가?
 * App에서 http를 import해서 데이터를 넘겨서 여기다가 줄 방법도 없을텐데?
 * -> 왜 그렇게 생각했을까?
 * 일단 인자로 http를 받을 수 있고, 기존에 받던 인자를 baseURL대신 http를 받아서 쓰면 된다.
 * 
 * 새로운 것을 React 컴포넌트에 주입하는 것이 아니고, 기존의 서비스 클래스에 새로운 인자를 넣는 것이며, React컴포넌트에 주입되는 서비스는 같다.
 * 
 */


import http from './clientHttp';
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

  constructor() {
    this.baseURL = 'http://127.0.0.1:8080';
  }

  async getTweets(username) {    
    return username
      ? http.fetch(`?username=${username}`,{method:'GET'})
      : http.fetch(`/tweets`,{method:'GET'});
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: 'Ellie',
      username: 'ellie',
      text,
    }

    let test = http.fetch(this.baseURL+`/tweets`,{method:'POST',body: JSON.stringify(tweet)})
    .then(res=>res.json());

    return tweet;
  }

  async deleteTweet(tweetId) {
    fetch(this.baseURL+`/tweets/${tweetId}`,{method:'DELETE'}).then(res=>res.json())
  }

  async updateTweet(tweetId, text) {
    const tweet = await fetch(this.baseURL+`/tweets/${tweetId}`,{method:'GET'}).then(res=>res.json());
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    let test = await fetch(this.baseURL+`/tweets/${tweetId}`,
      {
        method:'PUT',
        body:JSON.stringify({tweet})
      }
    )

    return tweet;
  }
}

// 외부 api와의 연결이 의미하는 것
// 나도 모르겠다. 각 서버에서 하나의 DB에 crud하는것과 뭐가 다르지?
// api를 변경할때 api서버에서만 변경하면 되는 것? => 통일시키는것?