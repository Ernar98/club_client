<template>
  <div>
    <section class="main">
      <div class="main__head">
        <a href="/"
          ><img src="@/assets/images/logo.png" id="logo" alt="Клуб Миллион"
        /></a>
        <div class="socials">
          <a href="https://vk.com/trafficmanagement"
            ><img src="@/assets/images/vk.svg" alt=""
          /></a>
          <a href="https://t.me/tipa_krutye_bloggery"
            ><img src="@/assets/images/telega.svg" alt=""
          /></a>
        </div>
      </div>
      <div class="main__content">
        <div class="text__block">
          <h1>Клуб “Миллион”</h1>
          <p>
            Место, где ты изменишь отношение к онлайн-заработку, найдёшь крутое
            окружение и, наконец, начнёшь делать мощные суммы без всяких
            напрягов
          </p>
          <div class="advantages__box">
            <p>
              Доступ в закрытый телеграм-канал, где публикуется обучающий
              материал из разных сфер заработка в интернете: Яндекс.Дзен, Пульс,
              Арбитраж, криптовалюта и другие
            </p>
            <p>
              Доступ в чат с участниками клуба, внутри которого ты можешь
              обмениваться информацией и получать обратную связь
            </p>
            <p>
              Доступ работает по ежемесячной подписке, период которой составляет
              30 календарных дней
            </p>
          </div>
          <div class="btn__box">
            <button @click="showModal(1)">Оплатить подписку</button>
            <button class="disable__subscription" @click="showModal(2)">
              Отменить подписку
            </button>
          </div>
        </div>
        <img id="phone__screen" src="@/assets/images/phone.png" />
      </div>
    </section>
    <footer>
      <div class="foot__content">
        <div class="insta__links">
          <a href="https://www.instagram.com/loktev_nespal/"
            ><img src="@/assets/images/insta.svg" />@loktev_nespal</a
          >
          <a href="https://www.instagram.com/plutalovf/"
            ><img src="@/assets/images/insta.svg" />@plutalovf</a
          >
          <a href="https://www.instagram.com/i.zinchenko_/"
            ><img src="@/assets/images/insta.svg" />@i.zinchenko_</a
          >
        </div>
        <div class="documentation">
          <a href="/policy.html">Политика конфиденциальности</a>
          <a href="/agreement.html">Пользовательское соглашение</a>
          <a href="/offer.html">Публичная оферта</a>
        </div>
        <div class="contacts">
          <span>ИП Локтев Сергей Павлович</span>
          <span>ИНН 540544157623</span>
          <span>ОГРН 321784700183811</span>
        </div>
      </div>
    </footer>
    <div @click="subscibeModal = false" v-if="subscibeModal" id="overlay">
      <div @click.stop="" class="form__wrap">
        <h4>Данные для оплаты</h4>
        <form class="form" v-on:submit.prevent="sub">
          <input v-model="subForm.name" type="text" placeholder="Ваше имя" />
          <input v-model="subForm.email" type="email" placeholder="E-mail" />
          <input
            type="text"
            v-mask="['@XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX']"
            v-model="subForm.telegram"
            placeholder="@Telegram_nickname"
            required
          />
          <input
            v-model="subForm.phone"
            v-mask="['+7 (###) ###-####']"
            placeholder="Телефон"
            required
          />
          <input type="number" placeholder="988 р. в месяц" disabled />
          <div class="policy" style="position: relative">
            <!-- <div id = "pot">
                        <img src = "/assets/images/arr.svg"width = "50px">
                    </div> -->
            <input required type="checkbox" />
            <label class="doc__text" style="text-align: center"
              >&nbsp;Подтверждаю, что ознакомился и соглашаюсь с
              <a href="/policy.html">политикой конфиденциальности</a>,
              <a href="/agreement.html">пользовательским соглашением</a> и
              <a href="/offer.html">публичной офертой</a></label
            >
          </div>
          <button type="submit">Оплатить подписку</button>
        </form>
      </div>
    </div>
    <div v-if="unsubscibeModal" @click="unsubscibeModal = false"  id="overlay1">
      <div @click.stop="" class="form__wrap">
        <h4>Отмена подписки</h4>
        <form class="form" v-on:submit.prevent="unsub">
          <input v-model="unsubForm.phone" v-mask="['+7 (###) ###-####']" type="text" placeholder="Телефон"  required/>
          <div class="policy" style="position: relative">
            <input required type="checkbox" />
            <label class="doc__text" style="text-align: center"
              >&nbsp;Подтверждаю, что ознакомился и соглашаюсь с
              <a href="/policy.html">политикой конфиденциальности</a>,
              <a href="/agreement.html">пользовательским соглашением</a> и
              <a href="/offer.html">публичной офертой</a></label
            >
          </div>
          <button
            style="
              background: linear-gradient(
                180deg,
                #757575 0%,
                #252525 100%
              ) !important;
            "
            type="submit"
          >
            Отменить подписку
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

const axios = require("axios");

export default {
  directives: { mask },
  data() {
    return {
      subForm:{
        name: '',
        email:'',
        telegram:'',
        phone:''
      },
      unsubForm:{
        phone:''
      },
      subscibeModal: false,
      unsubscibeModal: false,
      value: "",
      phone: "",
      tg: "",
    };
  },


  methods: {
    showModal(arg) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (arg === 1) {
        setTimeout(() => {
          this.subscibeModal = true;
        }, 500);
      } else {
        setTimeout(() => {
          this.unsubscibeModal = true;
        }, 500);
      }
    },

    sub(){
       axios({
        method: "post",
        url: "/createPayment",
        data: this.subForm,
      })
        .then((res) => {
          let url = res.data.confirmation.confirmation_url;
          window.location.href=url;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    unsub(){
       axios({
        method: "post",
        url: "/unsubscribe",
        data: this.unsubForm,
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },

  watch: {
    subscibeModal: function () {
      document.body.style.overflowY =
        this.subscibeModal || this.unsubscibeModal ? "hidden" : "visible";
    },
    unsubscibeModal: function () {
      document.body.style.overflowY =
        this.subscibeModal || this.unsubscibeModal ? "hidden" : "visible";
    },
  },
};
</script>

<style>
@import "./assets/styles.css";
</style>