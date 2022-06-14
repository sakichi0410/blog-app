const { Router } = require('express');
const express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kensyuu',
    password: '!pass123',
    database: 'blog_app'
  });

  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
  });

//sqlが読み取れてるかの確認
/*app.get('/top', (req, res) => {
    connection.query(
      'SELECT * FROM article',
      (error, results) => {
        console.log(results);
        res.render('hello.ejs');
      }
    );
  });*/


  //トップ画面でDBの一覧の表示
  app.get('/top',(req,res) => {
      connection.query(
          'SELECT * FROM articles',
          (error,results) => {
              console.log(results);
              res.render('home.ejs',{articles:results});
          }
      )
  })

  //ブログ記事の表示
  app.get('/article/:id', (req,res) => {
    const id = req.params.id;

    console.log(id);

    connection.query(
      'SELECT*FROM articles WHERE id=?',
      [id],
      (error,results) => {
      res.render('blog.ejs',{ article: results[0] });
    }
    )
    
 
  });

  //管理者　押下時　new.ejsに飛ぶように
  app.get('/new',(req,res) => {
    res.render('new.ejs');
  })

  //新規作成フォーム
  app.post('/new',(req,res) => {

    const title = req.body.title;
    const corum = req.body.corum;
    const main = req.body.main;

    console.log(title,corum,main);
    
    connection.query(
      'INSERT INTO articles(title,corum,main)VALUES (?,?,?)',
      [title,corum,main],
    (error, results) => {
      res.redirect('/top');
    }  
    )  

  });

  //一覧画面から記事の内容取得

  //一覧画面からの記事削除
  app.post('/delete/:id',(req,res) => {
    console.log(req.params.id);
  })
    /*connection.query(
      'DELETE FROM articles WHERE id = ?',
      [req.params.id],
      (error,results) => {
        res.redirect('/top');
      }
    )
  })*/


app.listen(3000);