<template>
  <div class="mx-auto grid max-w-screen-2xl grid-cols-[minmax(200px,260px)_1fr_minmax(200px,260px)] items-center max-lg:grid-cols-[minmax(200px,260px)_1fr] max-md:grid-cols-1">
    <div class="col-start-2 flex justify-center max-lg:px-4 max-md:col-start-1">
      <div class="mt-8 w-[min(750px,100%)] rounded-xl bg-white px-6 py-5 font-inter">
        <div>
          <h1 class="font-inter text-xl font-bold text-[#3B3551]">
            {{ t("title") }}
          </h1>
        </div>
        <Accordion class="mt-10" :multiple="false">
          <AccordionTab
            v-for="n in 17"
            :key="n"
            :header="`${n}. ${t(`${n}.question`)}`"
            :pt="{
              headeraction: 'justify-between gap-4 font-bold text-base hover:text-black px-3 py-4',
              root: 'mb-6 shadow rounded-md',
              content: '!pt-0',
            }"
          >
            <p class="m-0 border-l-2 border-blue-700 px-4 pb-2 text-black/70">
              <I18nT :keypath="`${n}.answer`">
                <template v-if="n === 1 || n === 4" #link>
                  <a v-if="n === 1" class="text-blue-500" href="https://citizensec.kz/awareness" target="_blank">{{ t(`${n}.link`) }}</a>
                  <a v-if="n === 4" class="text-blue-500" href="https://citizensec.kz" target="_blank">{{ t(`${n}.link`) }}</a>
                </template>
                <template #tg-link>
                  <a class="text-blue-500" href="https://t.me/citizensecbot" target="_blank">@citizensecbot</a>
                </template>
              </I18nT>
            </p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});
</script>

<i18n lang="json">
{
  "ru": {
    "title": "Часто задаваемые вопросы",
    "1": {
      "question": "Как получить сертификат?",
      "answer": "Чтобы получить сертификат, пройдите все модули курса на {link}. Для этого нажмите \"Начать курс\", авторизуйтесь и выполните все тесты. Сертификат станет доступен после успешного завершения.",
      "link": "сайте"
    },
    "2": {
      "question": "Как восстановить пароль?",
      "answer": "Если забыли пароль, нажмите \"Забыли пароль?\" на странице входа. Введите вашу почту, и вам придет письмо со ссылкой для создания нового пароля."
    },
    "3": {
      "question": "Как зарегистрироваться?",
      "answer": "На странице входа нажмите \"Регистрация\". Введите свои данные, придумайте пароль и повторите его. Затем нажмите \"Зарегистрироваться\". Ваш аккаунт будет создан."
    },
    "4": {
      "question": "Как войти в аккаунт?",
      "answer": "Перейдите на {link} и нажмите \"Войти\" в верхнем правом углу. Введите ваш логин и пароль, затем нажмите \"Войти\".",
      "link": "сайт"
    },
    "5": {
      "question": "Что делать, если появилась ошибка \"Повторите позже\"?",
      "answer": "Попробуйте открыть сайт в другом браузере и повторите попытку. Если ошибка сохраняется, свяжитесь с поддержкой."
    },
    "6": {
      "question": "Что делать, если мой e-mail уже зарегистрирован?",
      "answer": "Если ваш e-mail уже зарегистрирован, попробуйте сбросить пароль через \"Забыли пароль?\". Если почта вам не принадлежит, зарегистрируйтесь с другим e-mail."
    },
    "7": {
      "question": "Как связаться с поддержкой?",
      "answer": "Вы можете связаться с нами по почте info{'@'}citizensec.kz или через телеграм-бот {tg-link}."
    },
    "8": {
      "question": "Как подать заявку на оффлайн обучение?",
      "answer": "Напишите нам на info{'@'}citizensec.kz с подробностями: количество участников, город, формат (онлайн/оффлайн) и контакты для связи. Мы ответим вам в ближайшее время."
    },
    "9": {
      "question": "Какие требования к паролю?",
      "answer": "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальный символ."
    },
    "10": {
      "question": "Что делать, если я не помню свою почту для входа?",
      "answer": "Если вы не помните почту, с которой зарегистрировались, свяжитесь с поддержкой, указав как можно больше данных о вашем аккаунте."
    },
    "11": {
      "question": "Как изменить личные данные в аккаунте?",
      "answer": "Войдите в аккаунт, перейдите в 'Настройки' и измените нужные данные. Если изменения недоступны, обратитесь в поддержку."
    },
    "12": {
      "question": "Как удалить свой аккаунт?",
      "answer": "Чтобы удалить аккаунт, свяжитесь с поддержкой по почте info{'@'}citizensec.kz или через телеграм-бот {tg-link}."
    },
    "13": {
      "question": "Почему не приходит письмо для подтверждения регистрации?",
      "answer": "Проверьте папку 'Спам'. Если письма нет, попробуйте отправить его снова или свяжитесь с поддержкой."
    },
    "14": {
      "question": "Можно ли пройти курс на телефоне?",
      "answer": "Да, наши курсы доступны на мобильных устройствах. Убедитесь в наличии стабильного интернета."
    },
    "15": {
      "question": "Как долго действителен сертификат?",
      "answer": "Срок действия сертификата зависит от курса. Сертификат курса по кибергигиене для населения не имеет срока действия. Однако сам курс будет периодически обновляться и дополняться, что может потребовать дополнительного подтверждения сертификата."
    },
    "16": {
      "question": "Можно ли получить сертификат на другом языке?",
      "answer": "Да, наши сертификаты доступны на трёх языках: казахском, русском и английском. После завершения курса вы сможете выбрать, на каком языке получить сертификат. Если вам нужен сертификат на другом языке, свяжитесь с нами, и мы постараемся помочь."
    },
    "17": {
      "question": "Как предложить новый вопрос для базы?",
      "answer": "Отправьте ваш вопрос через форму на сайте или по почте info{'@'}citizensec.kz. Мы рассмотрим его и, если он полезен, добавим в базу."
    }
  },
  "kz": {
    "title": "Жиі қойылатын сұрақтар",
    "1": {
        "question": "Сертификатты қалай алуға болады?",
        "answer": "Сертификатты алу үшін {link}, яғни курсты сәтті аяқтағаннан кейін қол жетімді болады. Ол үшін \"Курсты бастау\" батырмасын басыңыз, авторизация жасап, әр сабақтан кейінгі барлық тесттерді орындаңыз.",
        "link": "курстың барлық модульдерін"
    },
    "2": {
        "question": "Құпия сөзді қалай қалпына келтіруге болады?",
        "answer": "Егер құпия сөзді ұмытып қалсаңыз, кіру парақшасындағы \"Құпия сөзді ұмыттыңыз ба?\" батырмасын басыңыз. Электрондық поштаңызды енгізіңіз, сонда сізге жаңа құпия сөз жасауға мүмкіндік беретін сілтеме келеді."
    },
    "3": {
        "question": "Қалай тіркелуге болады?",
        "answer": "Кіру парақшасында \"Тіркелу\" батырмасын басыңыз. Жеке деректеріңізді енгізіңіз, құпия сөз ойлап тауып, оны қайта жазыңыз. Содан кейін \"Тіркелу\" батырмасын басыңыз. Мұның нәтижесінде сіздің аккаунтыңыз тіркеледі."
    },
    "4": {
      "question": "Аккаунтқа қалай кіруге болады?",
      "answer": "{link} өтіп, оң жақ жоғары бұрыштағы 'Кіру' батырмасын басыңыз. Логин мен құпия сөзді енгізіп, 'Кіру' батырмасын басыңыз.",
      "link": "Cайтқа"
    },
    "5": {
      "question": "'Кейінірек қайталаңыз' деген қате пайда болды. Не істеу керек?",
      "answer": "Сайтты басқа браузерде ашып, әрекеттеріңізді қайталаңыз. Егер ешбір өзгеріс байқамасаңыз, қолдау қызметіне хабарласыңыз."
    },
    "6": {
      "question": "Егер менің e-mail-ым тіркеліп қойған болса не істеу керек?",
      "answer": "Егер сіздің e-mail-ңыз тіркеліп қойған болса, 'Құпия сөзді ұмыттыңыз ба?' батырмасы арқылы құпия сөзді қалпына келтіріңіз. Егер пошта сізге тиесілі болмаса, басқа e-mail арқылы тіркеліңіз."
    },
    "7": {
      "question": "Қолдау қызметімен қалай байланысуға болады?",
      "answer": "Бізбен info{'@'}citizensec.kz электрондық поштасы арқылы немесе {tg-link} телеграм-боты арқылы байланыса аласыз."
    },
    "8": {
      "question": "Оффлайн оқыту өткізіге шақыру үшін не істеу керек?",
      "answer": "Оффлайн оқытуды өткізу үшін info{'@'}citizensec.kz поштасына қатысушылар саны, қала, формат (онлайн/оффлайн) жайлы ақпараттар және жауапты тұлғаның байланыс деректерін қоса отырып, өтініш жіберіңіз. Біз сізге жақын арада жауап береміз."
    },
    "9": {
      "question": "Құпия сөзге қойылатын талаптар қандай?",
      "answer": "Құпия сөз кемінде 8 таңбадан тұруы керек, оның ішінде бас және кіші әріптер, сандар және арнайы таңба болуы керек."
    },
    "10": {
      "question": "Егер мен кіру үшін өз поштамды ұмытып қалсам не істеу керек?",
      "answer": "Егер тіркелу үшін қолданған поштаңызды ұмытып қалсаңыз, аккаунтыңыз туралы мүмкіндігінше мәліметтерді жинақтап, қолдау қызметіне хабарласыңыз, поштамыз info{'@'}citizensec.kz."
    },
    "11": {
      "question": "Аккаунттағы жеке деректерді қалай өзгертуге болады?",
      "answer": "Аккаунтыңызға кіріп, 'Параметрлер' бөліміне өтіп, қажетті деректерді өзгертіңіз. Егер деректерді өзгерту мүмкін болмаса, қолдау қызметіне хабарласыңыз."
    },
    "12": {
      "question": "Аккаунтты қалай жоюға болады?",
      "answer": "Аккаунтты жою үшін info{'@'}citizensec.kz поштасы арқылы немесе {tg-link} телеграм-боты арқылы қолдау қызметіне хабарласыңыз."
    },
    "13": {
      "question": "Тіркеуді растау үшін хат келмеді. Неге?",
      "answer": "Егер тіркеуді растау хаты келмесе, «Спам» папкасын тексеріңіз. Егер хат жоқ болса, тіркелу процесін қаталап көріңіз немесе қолдау қызметіне хабарласыңыз."
    },
    "14": {
      "question": "Курсты телефон арқылы өтуге бола ма?",
      "answer": "Иә, біздің курстарымызды мобильді құрылғыларда өтуге болады."
    },
    "15": {
      "question": "Сертификат қанша уақытқа жарамды?",
      "answer": "Сертификаттың жарамдылық мерзімі курсқа байланысты. Қоғамға арналған кибергигиена курсының сертификатының жарамдылық мерзімі жоқ. Дегенмен, курс жаңартылып, толықтырылып отырады, бұл сертификатты қайта растауды талап етуі мүмкін."
    },
    "16": {
      "question": "Сертификатты ағылшын тілінде алуға бола ма?",
      "answer": "Иә, біздің сертификаттарымыз үш тілде қолжетімді: қазақ, орыс және ағылшын тілдерінде. Курсты аяқтағаннан кейін сертификатты қай тілде алғыңыз келетінін таңдауға болады. Егер сізге басқа тілде сертификат қажет болса, бізге хабарласыңыз, көмектесуге тырысамыз."
    },
    "17": {
      "question": "Жиі қойылатын сұрақтар базасына жаңа сұрақты қалай ұсынуға болады?",
      "answer": "Сұрағыңызды сайттағы форма арқылы немесе info{'@'}citizensec.kz поштасына жіберіңіз. Егер ол пайдалы болса, біз оны базаға қосамыз."
    }
  },
  "en": {
    "title": "Frequently Asked Questions",
    "1": {
        "question": "How can I get a certificate?",
        "answer": "To receive a certificate, you must complete all course modules on {link}. Click on \"Start Course\", sign in, and complete all the tests after each lesson. The certificate will be available upon successful completion.",
        "link": "the website"
    },
    "2": {
        "question": "How can I reset my password?",
        "answer": "If you forgot your password, click \"Forgot Password?\" on the login page. Enter your email address, and you will receive a link to create a new password."
    },
    "3": {
        "question": "How do I register?",
        "answer": "On the login page, click \"Register.\" Enter your personal details, create a password, and re-enter it. Then click \"Register.\" This will create your account."
    },
    "4": {
      "question": "How do I log in to my account?",
      "answer": "Go to {link} and click 'Log In' in the top right corner. Enter your login and password, and then click 'Log In.'",
      "link": "the website"
    },
    "5": {
      "question": "What should I do if I see the error 'Please try again later'?",
      "answer": "Try opening the website in a different browser and repeat your actions. If the error persists, contact support."
    },
    "6": {
      "question": "What if my email is already registered?",
      "answer": "If your email is already registered, try resetting your password using the 'Forgot Password?' option. If the email doesn't belong to you, please register with a different email address."
    },
    "7": {
      "question": "How can I contact support?",
      "answer": "You can contact us via email at info{'@'}citizensec.kz or through our Telegram bot {tg-link}."
    },
    "8": {
      "question": "How do I request an offline training session?",
      "answer": "To request offline training, send an email to info{'@'}citizensec.kz with the number of participants, city, format (online/offline), and the contact details of the responsible person. We will respond to you shortly."
    },
    "9": {
      "question": "What are the password requirements?",
      "answer": "Your password must be at least 8 characters long, including uppercase and lowercase letters, numbers, and special characters."
    },
    "10": {
      "question": "What should I do if I forgot the email I used to log in?",
      "answer": "If you forgot the email you used for registration, gather as much information as possible about your account and contact support at info{'@'}citizensec.kz."
    },
    "11": {
      "question": "How can I update my personal information in my account?",
      "answer": "Log in to your account, go to the 'Settings' section, and update the necessary information. If you are unable to make changes, please contact support."
    },
    "12": {
      "question": "How do I delete my account?",
      "answer": "To delete your account, contact support via email at info{'@'}citizensec.kz or through our Telegram bot {tg-link}."
    },
    "13": {
      "question": "I didn’t receive a confirmation email for registration. Why?",
      "answer": "If you didn’t receive a confirmation email, check your 'Spam' folder. If the email is not there, try registering again or contact support."
    },
    "14": {
      "question": "Can I take the course on a mobile device?",
      "answer": "Yes, our courses are accessible on mobile devices."
    },
    "15": {
      "question": "How long is the certificate valid?",
      "answer": "The validity of the certificate depends on the course. The certificate for the Cyber Hygiene course for Citizens has no expiration date. However, the course will be periodically updated and supplemented, which may require re-certification."
    },
    "16": {
      "question": "Can I get the certificate in Kazakh/English?",
      "answer": "Yes, our certificates are available in three languages: Kazakh, Russian, and English. After completing the course, you can choose the language in which you want to receive the certificate. If you need the certificate in another language, please contact us, and we will do our best to assist you."
    },
    "17": {
      "question": "How can I suggest a new question for the FAQ section?",
      "answer": "You can submit your question through the form on the website or send it to info{'@'}citizensec.kz. If it’s helpful, we will add it to the FAQ section."
    }
  }
}
</i18n>
