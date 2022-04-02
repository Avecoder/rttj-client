<template>
  <div class="auth-container">
    <div class="auth-wrap first">
      <h1 class="label">Добро пожаловать в UI версии телеграм-бота <a href="https://t.me/road_to_the_Junior_bot">@road_to_the_Junior_bot</a></h1>
      <img :src="`${config.logoURL}`" alt="">
    </div>
    <div class="auth-wrap second">
      <img src="../assets/img/description.png" alt="">
      <p>В UI версии ты можешь очень удобно просматривать свою статистику и проставлять задания.В основном приложение предназначено  для программистов, проще говоря to-do-list. Также можно добавлять к себе товарищей и соревноваться кто больше прозанимался за текущую неделю.</p>
    </div>
    <h3 class="label">На самом деле ты не должен был оказаться на этой странице, но если ты это читаешь, то: </h3>
    <div class="auth-wrap third">
      <ul>
        <li>Не зарегистрировался через <a href="https://t.me/road_to_the_Junior_bot">бота</a>.</li>
        <li>Давно не заходил с данного устройства, поэтому стоит перезайти сюда через команду UI в боте.</li>
        <li>Либо ты попытался подделать токен, пошёл вон, нельзя называться мужчиной, совершив данный поступок.</li>
      </ul>
      <img src="../assets/img/reason.png" alt="">
    </div>
  </div>
</template>

<script setup>
  import config from '../config'
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  @import '../assets/styles/variables.scss';

  .auth{
    &-container{
      margin: 0 auto;
      max-width: 1260px;
      h3.label{
        margin-bottom: 60px;
        max-width:620px;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 40px;
        color: #222222;
      }
    }
    &-wrap{
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      img{
        border-radius: 10px;
      }
      &.first{
        padding-top: 100px;
        margin-bottom: 240px;
        h1.label{
          font-family: 'Raleway', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 40px;
          line-height: 60px;
          color: #222222;
          max-width: 600px;
        }
        a{
          text-decoration: none;
          color: $blue;
        }
        img{
          width: 400px;
        }
      }
      &.second{
        margin-bottom: 240px;
        img{
          width: 600px;
        }
        p{
          font-family: 'Raleway', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 30px;
          color: #222222;
          max-width: 520px;
          padding-left: 30px;
        }
      }
      &.third{
        margin-bottom: 120px;
        img{
          width: 480px;
        }
        ul{
          margin: 0;
          padding: 0;
          max-width: 600px;
          padding-top: 30px;
          li{
            list-style: none;
            margin: 0;
            padding: 0;
            font-family: 'Raleway', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 26px;
            color: #000000;
            margin-bottom: 44px;
            padding-left: 26px;
            position: relative;
            &:before{
              position: absolute;
              content: '';
              left: 0;
              top: 0;
              transform: translateY(6px);
              border: .5px solid $blue;
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            a{
              color: $blue;
            }
          }
        }
      }
    }

  }

  @media (max-width: 900px) and (min-width: 601px) {
    .auth-container{
      h3.label{
        padding: 20px;
      }
    }
    .auth-wrap{
      -ms-align-items: center;
      align-items: center;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      &.first{
        -webkit-flex-direction: column-reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
        margin-bottom: 220px;
        img{
          margin-bottom: 35px;
          width: 240px;
        }
        h1.label{
          font-size: 30px;
          line-height: 45px;
          text-align: center;
        }
      }
      &.second{
        margin-bottom: 220px;
        img{
          max-width: 380px;
          margin: 0 auto;
        }
        p{
          margin-top: 35px;
          padding: 20px;
        }
      }
      &.third{
        ul{
          padding: 20px;
        }
        img{
          max-width: 380px;
          margin: 0 auto;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .auth-container{
      h3.label{
        padding: 20px;
      }
    }
    .auth-wrap{
      -ms-align-items: center;
      align-items: center;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      &.first{
        -webkit-flex-direction: column-reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
        margin-bottom: 320px;
        img{
          margin-bottom: 35px;
          width: 240px;
        }
        h1.label{
          font-size: 30px;
          line-height: 45px;
          text-align: center;
        }
      }
      &.second{
        margin-bottom: 220px;
        img{
          width: 90%;
          margin: 0 20px;
        }
        p{
          margin-top: 35px;
          padding: 20px;
        }
      }
      &.third{
        ul{
          padding: 20px;
        }
        img{
          width: 90%;
          margin: 0 20px;
        }
      }
    }
  }

  #app {
    &.dark{
      .auth-container{
        h3.label{
          color: #fff;
        }
        h1.label{
          color: #fff;
          a{
            color: $cyan;
          }
        }
        p{
          color: #fff;
        }
        ul{
          li{
            color: #fff;
            a{
              color: $cyan;
            }
            &:before{
              border-color: $cyan;
            }
          }
        }
      }
    }
  }
</style>
