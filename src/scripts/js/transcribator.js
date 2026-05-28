import { initAnimations } from '../modules/init-animations.js';
import { isValidEmail } from '../modules/utils.js';
import { scrollUp } from '../modules/scroll-up.js';

/* Стрелка ------------------------------------------------------------------------*/
scrollUp();

let uploadedFiles = [];
/* Dropzone */
Dropzone.autoDiscover = false;

document.addEventListener("DOMContentLoaded", function () {
  let myDropzone;
  let totalDuration = 0; // общий показатель для всех добавленных файлов
  const supportedFormats = [
    "3dostr",
    "3g2",
    "3gp",
    "4xm",
    "a64",
    "aa",
    "aac",
    "aax",
    "ac3",
    "ace",
    "acm",
    "act",
    "adf",
    "adp",
    "ads",
    "adts",
    "adx",
    "aea",
    "afc",
    "aiff",
    "aix",
    "alaw",
    "alias_pix",
    "alp",
    "alsa",
    "amr",
    "amrnb",
    "amrwb",
    "amv",
    "anm",
    "apc",
    "ape",
    "apm",
    "apng",
    "aptx",
    "aptx_hd",
    "argo_asf",
    "argo_brp",
    "asf",
    "asf_o",
    "asf_stream",
    "ast",
    "au",
    "av1",
    "avi",
    "avm2",
    "avr",
    "avs",
    "avs2",
    "avs3",
    "bethsoftvid",
    "bfi",
    "bfstm",
    "bink",
    "binka",
    "bit",
    "bmp_pipe",
    "bmv",
    "boa",
    "brender_pix",
    "brstm",
    "c93",
    "caca",
    "caf",
    "cavsvideo",
    "cdg",
    "cdxl",
    "chromaprint",
    "cine",
    "codec2",
    "codec2raw",
    "concat",
    "cri_pipe",
    "dash",
    "daud",
    "dcstr",
    "dds_pipe",
    "derf",
    "dfa",
    "dhav",
    "dirac",
    "dnxhd",
    "dpx_pipe",
    "dsf",
    "dsicin",
    "dss",
    "dts",
    "dtshd",
    "dv",
    "dvbsub",
    "dvbtxt",
    "dvd",
    "dxa",
    "ea",
    "ea_cdata",
    "eac3",
    "epaf",
    "exr_pipe",
    "f32be",
    "f32le",
    "f4v",
    "f64be",
    "f64le",
    "fbdev",
    "fifo",
    "fifo_test",
    "film_cpk",
    "filmstrip",
    "fits",
    "flac",
    "flic",
    "flv",
    "framecrc",
    "framehash",
    "framemd5",
    "frm",
    "fsb",
    "fwse",
    "g722",
    "g723_1",
    "g726",
    "g726le",
    "g729",
    "gdv",
    "genh",
    "gsm",
    "gxf",
    "h261",
    "h263",
    "h264",
    "hca",
    "hcom",
    "hds",
    "hevc",
    "hls",
    "hnm",
    "idcin",
    "idf",
    "iec61883",
    "iff",
    "ifv",
    "ilbc",
    "ingenient",
    "ipmovie",
    "ipod",
    "ipu",
    "ircam",
    "ismv",
    "iss",
    "iv8",
    "ivf",
    "ivr",
    "j2k_pipe",
    "jack",
    "jpeg_pipe",
    "jpegls_pipe",
    "jv",
    "kmsgrab",
    "kux",
    "kvag",
    "latm",
    "lavfi",
    "libcdio",
    "libdc1394",
    "libgme",
    "libopenmpt",
    "live_flv",
    "lmlm4",
    "loas",
    "luodat",
    "lvf",
    "lxf",
    "m4a",
    "m4v",
    "matroska",
    "mca",
    "mcc",
    "mgsts",
    "mj2",
    "mjpeg",
    "mjpeg_2000",
    "mlp",
    "mlv",
    "mm",
    "mmf",
    "mods",
    "moflex",
    "mov",
    "mp2",
    "mp3",
    "mp4",
    "mpc",
    "mpc8",
    "mpeg",
    "mpeg1video",
    "mpeg2video",
    "mpegts",
    "mpegtsraw",
    "mpegvideo",
    "msf",
    "msnwctcp",
    "msp",
    "mtaf",
    "mtv",
    "mulaw",
    "musx",
    "mv",
    "mvi",
    "mxf",
    "mxf_d10",
    "mxf_opatom",
    "mxg",
    "nc",
    "nistsphere",
    "nsp",
    "nsv",
    "null",
    "nut",
    "nuv",
    "obu",
    "oga",
    "ogg",
    "ogv",
    "oma",
    "openal",
    "opengl",
    "opus",
    "oss",
    "paf",
    "pam_pipe",
    "pbm_pipe",
    "pcx_pipe",
    "pgm_pipe",
    "pgmyuv_pipe",
    "pgx_pipe",
    "photocd_pipe",
    "pictor_pipe",
    "pmp",
    "pp_bnk",
    "ppm_pipe",
    "psd_pipe",
    "psp",
    "psxstr",
    "pulse",
    "pva",
    "pvf",
    "qcp",
    "qdraw_pipe",
    "r3d",
    "rawvideo",
    "redspark",
    "rl2",
    "rm",
    "roq",
    "rpl",
    "rsd",
    "rso",
    "rtp",
    "rtp_mpegts",
    "rtsp",
    "s16be",
    "s16le",
    "s24be",
    "s24le",
    "s32be",
    "s32le",
    "s337m",
    "s8",
    "sap",
    "sbc",
    "sbg",
    "sdp",
    "sdr2",
    "sds",
    "sdx",
    "segment",
    "ser",
    "sga",
    "sgi_pipe",
    "shn",
    "siff",
    "simbiosis_imx",
    "sln",
    "smjpeg",
    "smk",
    "smoothstreaming",
    "smush",
    "sndio",
    "sol",
    "sox",
    "spdif",
    "spx",
    "stream_segment",
    "streamhash",
    "sunrast_pipe",
    "svag",
    "svcd",
    "svs",
    "swf",
    "tak",
    "tee",
    "thp",
    "tiertexseq",
    "tmv",
    "truehd",
    "tta",
    "txd",
    "ty",
    "u16be",
    "u16le",
    "u24be",
    "u24le",
    "u32be",
    "u32le",
    "u8",
    "v210",
    "v210x",
    "v4l2",
    "vag",
    "vc1",
    "vc1test",
    "vcd",
    "vidc",
    "video4linux2",
    "vividas",
    "vivo",
    "vmd",
    "vob",
    "voc",
    "vpk",
    "vqf",
    "w64",
    "wav",
    "wc3movie",
    "webm",
    "webm_chunk",
    "webp",
    "webp_pipe",
    "wsaud",
    "wsd",
    "wsvqa",
    "wtv",
    "wv",
    "wve",
    "x11grab",
    "xa",
    "xbm_pipe",
    "xmv",
    "xpm_pipe",
    "xv",
    "xvag",
    "xwma",
    "yop",
    "yuv4mpegpipe",
    "mkv",
  ];

  function updateTotalPrice() {
    let priceInfo = document.getElementById("price-info");
    if (totalDuration > 0) {
      priceInfo.style.display = "flex"; // Показываем элемент, если общая длительность больше 0
      if (totalDuration <= 3600) {
        // <= 60 минут (3600 секунд)
        priceInfo.textContent = "Общая стоимость: 500 рублей";
      } else if (totalDuration <= 7200) {
        // <= 2 часа (7200 секунд)
        priceInfo.textContent = "Общая стоимость: 650 рублей";
      } else {
        // более 2 часов (7200 секунд)
        priceInfo.textContent = "Общая стоимость: 800 рублей";
      }
    } else {
      priceInfo.style.display = "none"; // Скрываем элемент, если нет добавленных файлов
    }
  }
  function showMaxFilesAlert() {
    let alertInfo = document.getElementById("alert-info");
    alertInfo.style.display = "block"; // Показываем сообщение
    alertInfo.innerHTML = ""; // Очистим предыдущие сообщения, если есть

    let maxFilesAlert = document.createElement("div");
    maxFilesAlert.classList.add("alert", "alert-danger");
    maxFilesAlert.textContent = "Вы можете загрузить не более 5 файлов.";
    alertInfo.appendChild(maxFilesAlert);

    setTimeout(() => {
      alertInfo.style.display = "none"; // Скрыть сообщение через 3 секунды
    }, 3000);
  }
  new Dropzone("#my-dropzone", {
    url: "upload.php",
    autoProcessQueue: true, // Автоматически загружать файлы после их добавления
    uploadMultiple: false, // Изменено на false для индивидуальной обработки каждого файла.
    parallelUploads: 5,
    maxFiles: 5,
    maxFilesize: 1024, // Размер файла в MB
    acceptedFiles: supportedFormats.map((format) => `.${format}`).join(","),
    dictDefaultMessage: "Перетащите файлы сюда для загрузки",
    init: function () {
      myDropzone = this;

      this.on("addedfile", function (file) {
        if (myDropzone.files.length > 5) {
          myDropzone.removeFile(file);
          showMaxFilesAlert();
          return;
        }

        document.getElementById("upload-button").classList.add("hidden");
        document.getElementById("button-add").classList.add("show");
        document.getElementById("button-proccess").classList.add("show");

        let durationInfo = document.createElement("div");
        durationInfo.className = "duration-info";
        file.previewElement.appendChild(durationInfo);

        let removeButton = Dropzone.createElement("<button class='dz-remove'>Удалить файл</button>");
        removeButton.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          totalDuration -= file.duration; // Уменьшаем общую длительность
          myDropzone.removeFile(file);
          updateTotalPrice(); // Обновляем цену после удаления файла
        });
        file.previewElement.appendChild(removeButton);

        let videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        videoElement.hidden = true;
        file.previewElement.appendChild(videoElement);

        let player = new Plyr(videoElement);
        player.on("loadedmetadata", function () {
          let duration = player.duration;
          let minutes = Math.floor(duration / 60);
          let seconds = Math.floor(duration % 60);

          durationInfo.textContent = `Длительность: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

          file.duration = duration; // сохраняем длительность файла в свойство
          totalDuration += duration; // Увеличиваем общую длительность
          updateTotalPrice(); // Обновляем цену после добавления файла
        });

        // Добавление элемента dz-progress
        let progressElement = document.createElement("div");
        progressElement.className = "dz-progress";
        let uploadElement = document.createElement("span");
        uploadElement.className = "dz-upload";
        uploadElement.setAttribute("data-dz-uploadprogress", "");
        progressElement.appendChild(uploadElement);
        file.previewElement.appendChild(progressElement);
      });

      this.on("uploadprogress", function (file, progress) {
        if (file.previewElement) {
          let progressElement = file.previewElement.querySelector("#upload-progress");
          if (!progressElement) {
            progressElement = document.createElement("div");
            progressElement.id = "upload-progress";
            file.previewElement.appendChild(progressElement);
          }
          progressElement.style.width = progress + "%";
          progressElement.textContent = "Загрузка: " + Math.round(progress) + "%";
        }
      });

      this.on("complete", function (file) {
        // Получим элемент upload-progress
        let progressElement = document.getElementById("upload-progress");

        // Убедимся, что этот элемент существует
        if (progressElement) {
          // Поместим текст состояния загрузки
          progressElement.textContent = "Загрузка завершена";
        }
      });
      this.on("success", function (file, response) {
        try {
          // Преобразование ответа в JSON, если это строка
          if (typeof response === "string") {
            response = JSON.parse(response);
          }

          if (response.uuid) {
            uploadedFiles.push(response.uuid); // Добавляем UUID файла в массив

            // Сохранение UUID в файле для дальнейшего использования
            file.serverId = response.uuid;
          } else {
            console.error("Ошибка: не удалось получить UUID из ответа.");
          }
        } catch (e) {
          console.error("Ошибка парсинга ответа:", e);
        }
      });

      this.on("removedfile", function (file) {
        // Удаляем файл из массива при его удалении из Dropzone
        if (file.serverId) {
          uploadedFiles = uploadedFiles.filter((f) => f !== file.serverId);
        }
      });

      this.on("error", function (file, errorMessage, xhr) {
        console.error("Error uploading file:", file, errorMessage, xhr);

        // Получим элемент upload-progress
        let progressElement = file.previewElement.querySelector("#upload-progress");

        // Убедимся, что этот элемент существует
        if (progressElement) {
          // Поместим текст состояния ошибки
          progressElement.textContent = "Ошибка загрузки";
        }
      });
    },
    clickable: [".trancrib__form"],
  });

  document.getElementById("upload-button").addEventListener("click", function () {
    myDropzone.hiddenFileInput.click();
  });

  const trancribForm = document.querySelector(".trancrib__form");

  trancribForm.addEventListener("click", function (event) {
    if (event.target.matches("#upload-button") || event.target.closest(".trancrib__img") || event.target.closest(".trancrib__text")) {
      myDropzone.hiddenFileInput.click();
    }
  });

  document.getElementById("button-add").addEventListener("click", function () {
    myDropzone.hiddenFileInput.click();
  });

  document.getElementById("button-proccess").addEventListener("click", function () {
    myDropzone.processQueue(); // запускаем процесс загрузки

    // Модальное окно оплаты
    $.fancybox.open({
      src: "#modal-oplata",
      type: "inline",
      opts: {
        afterShow: function (instance, slide) {},
      },
    });
  });
});

// обработка форм
function formValidationOplata() {
  const validation = new JustValidate(".modal-oplata__form");

  // Маска для телефона
  const inputMask = new Inputmask("+7 (999) 999-99-99");
  const telSelector = document.querySelector(".modal-oplata__phone");
  inputMask.mask(telSelector);

  validation
    .addField(
      ".modal-oplata__name",
      [
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Имя должно содержать минимум 2 символа",
        },
        {
          rule: "maxLength",
          value: 50,
          errorMessage: "Имя не должно превышать 50 символов",
        },
        {
          rule: "required",
          value: true,
          errorMessage: "Введите имя",
        },
      ],
      {
        errorFieldCssClass: "is-invalid",
        errorLabelCssClass: "invalid-feedback",
      }
    )
    .addField(
      ".modal-oplata__phone",
      [
        {
          rule: "required",
          value: true,
          errorMessage: "Введите телефон",
        },
      ],
      {
        errorFieldCssClass: "is-invalid",
        errorLabelCssClass: "invalid-feedback",
      }
    )
    .addField(
      ".modal-oplata__email",
      [
        {
          rule: "required",
          value: true,
          errorMessage: "Введите электронную почту",
        },
        {
          rule: "email",
          value: true,
          errorMessage: "Введите корректную электронную почту",
        },
      ],
      {
        errorFieldCssClass: "is-invalid",
        errorLabelCssClass: "invalid-feedback",
      }
    )
    .onSuccess((event) => {
      let formData = new FormData(event.target);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (4 === xhr.readyState && 200 === xhr.status) {
          openModalPay(formData);
        }
      };
      xhr.open("POST", "oplata.php", true);
      xhr.send(formData);
      event.target.reset();
    });
}
formValidationOplata();

function btnValidationOplata() {
  const btn = document.querySelector(".modal-oplata__btn");
  const inputName = document.querySelector(".modal-oplata__name");
  const inputPhone = document.querySelector(".modal-oplata__phone");
  const inputEmail = document.querySelector(".modal-oplata__email");
  const selectedform = document.querySelector('input[name="format"]:checked');
  const pricetext = document.getElementById("price-info");
  const text = pricetext.textContent;
  const match = text.match(/\d+/); // Ищем числовое значение в строке

  let price = 0; // Инициализируем переменную по умолчанию

  if (match) {
    price = parseInt(match[0], 10); // Преобразуем найденное значение в число
  }

  inputName.addEventListener("input", checkLength);
  inputPhone.addEventListener("input", checkLength);
  inputEmail.addEventListener("input", checkLength);

  function checkLength() {
    if (inputName.value.length > 1 && inputPhone.value.length > 1 && inputEmail.value.length > 1 && isValidEmail(inputEmail.value)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }

  btn.addEventListener("click", function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение кнопки

    if (btn.classList.contains("active")) {
      // Проверяем, активна ли кнопка
      let formData = new FormData(); // Создаём объект FormData
      formData.append("name", inputName.value); // Добавляем имя
      formData.append("phone", inputPhone.value); // Добавляем телефон
      formData.append("email", inputEmail.value); // Добавляем email
      formData.append("files", JSON.stringify(uploadedFiles));
      formData.append("format", selectedform.value); // Добавляем файлы в формате JSON
      formData.append("price", parseInt(document.getElementById("price-info").textContent.match(/\d+/)[0]));
      let xhr = new XMLHttpRequest(); // Создаем новый AJAX-запрос

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const paymentLink = xhr.responseText; // Получаем ссылку на оплату
          window.location.href = paymentLink; // Перенаправляем пользователя на страницу оплаты
        }
      };

      xhr.open("POST", "pay.php", true); // Настройка AJAX-запроса на отправку данных на сервер
      xhr.send(formData); // Отправка данных формы
    }
  });
}
btnValidationOplata();

$(document).ready(function () {
  $("#oplata-form").submit(function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    openModalPay(formData);
  });
  function openModalPay(formData) {
    $.fancybox.close();
    document.querySelector(".hidden-name").value = formData.get("name");
    document.querySelector(".hidden-phone").value = formData.get("phone");
    document.querySelector(".hidden-email").value = formData.get("email");
    $.fancybox.open({
      src: "#modal-pay",
      type: "inline",
    });
  }
});

/* Анимация ------------------------------------------*/
initAnimations();
