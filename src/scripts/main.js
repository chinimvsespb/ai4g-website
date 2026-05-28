//main.js - Главный файл, который импортирует все модули и запускает их
import "../styles/main.scss";

// ==================== UI ====================
import { initMenu } from "./modules/ui/menu.js";
import { scrollUp } from "./modules/ui/scroll-up.js";
import { showMore } from "./modules/ui/show-more.js";
import { cutText } from "./modules/ui/cut-text.js";

// ==================== ANIMATIONS ====================
import { fairwayAnim } from "./modules/animations/fairway-anim.js";
import { mentorsAnim } from "./modules/animations/mentors-anim.js";
import { choiceAnim } from "./modules/animations/choice-anim.js";
import { partnersAnim } from "./modules/animations/partners-anim.js";

// ==================== FORMS ====================
import { formValidation } from "./modules/forms/form-validation.js";
import { btnValidation } from "./modules/forms/btn-validation.js";
import { initPaymentModal } from "./modules/forms/payment-modal.js";

// ==================== SLIDERS ====================
import { initSwiper } from "./modules/sliders/init-swiper.js";

// ==================== UTILS ====================
import { firefoxFix } from "./modules/utils/firefox-fix.js";

// ==================== INIT ====================
initSwiper();

showMore();
cutText();
scrollUp();
initMenu();

fairwayAnim();
mentorsAnim();
choiceAnim();
partnersAnim();

firefoxFix();

formValidation();
btnValidation();
initPaymentModal();
