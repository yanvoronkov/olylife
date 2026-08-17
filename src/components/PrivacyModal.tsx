import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full text-slate-900 relative shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Fixed Header with Close Button */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white/95 backdrop-blur-sm shrink-0 relative z-10">
          <div className="flex items-center gap-3 pr-4">
            <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] text-[#1E9646] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">Политика конфиденциальности</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Закон Республики Узбекистан № ЗРУ-547 «О персональных данных»</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-all cursor-pointer shrink-0 shadow-xs"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          
          {/* Раздел 1 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              1. Общие положения
            </h4>
            <p>
              <strong className="text-slate-800">1.1.</strong> Настоящая Политика конфиденциальности (далее – Политика) разработана во исполнение требований Закона Республики Узбекистан от 2 июля 2019 года № ЗРУ-547 «О персональных данных» (далее — Закон № ЗРУ-547) и определяет порядок обработки персональных данных и меры по обеспечению их безопасности при использовании настоящего сайта (далее – Сайт).
            </p>
            <p>
              <strong className="text-slate-800">1.2.</strong> Пользователем является физическое или юридическое лицо, пользующееся Сайтом или оставившее на Сайте заявку на ознакомительный сеанс биохакинга на wellness-оборудовании.
            </p>
            <p>
              <strong className="text-slate-800">1.3.</strong> В силу Закона № ЗРУ-547 Владелец Сайта является Оператором — государственным органом, физическим и (или) юридическим лицом, осуществляющим обработку персональных данных (далее – Оператор).
            </p>
            <p>
              <strong className="text-slate-800">1.4.</strong> Оператор вправе привлекать третьих лиц (включая уполномоченных партнеров и сервис-провайдеров) для обработки персональных данных от имени Оператора и в его интересах на основании соответствующего договора.
            </p>
          </section>

          {/* Раздел 2 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              2. Состав обрабатываемых персональных данных
            </h4>
            <p>Под персональными данными Пользователей в целях, предусмотренных настоящей Политикой, понимаются:</p>
            
            <p className="font-semibold text-slate-800 pt-1">2.1. Персональная информация, предоставляемая Пользователем самостоятельно:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Фамилия, имя, отчество;</li>
              <li>Номер контактного телефона;</li>
              <li>Адрес электронной почты (e-mail);</li>
              <li>Профессия / род деятельности;</li>
              <li>Иная информация, указываемая Пользователем в формах обратной связи и записи на сеанс.</li>
            </ul>

            <p className="font-semibold text-slate-800 pt-2">2.2. Дополнительные и технические данные, собираемые автоматически:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>IP-адрес, файлы cookie (куки);</li>
              <li>Данные о геолокации;</li>
              <li>Информация о посещении Сайта, предоставляемая сервисами веб-аналитики (Yandex Metrika, Google Analytics и др.);</li>
              <li>Информация об устройстве, операционной системе, типе браузера и настройках;</li>
              <li>Информация из журналов регистраций событий сервера (лог-файлы).</li>
            </ul>
          </section>

          {/* Раздел 3 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              3. Цели и способы обработки персональных данных
            </h4>
            <p className="font-semibold text-slate-800">3.1. Целями обработки персональных данных являются:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Запись Пользователя на ознакомительный сеанс биохакинга на wellness-оборудовании;</li>
              <li>Оказание услуг Пользователю и коммуникация с ним (звонки, сообщения, электронные письма);</li>
              <li>Оказание услуг партнерами Сайта (при необходимости);</li>
              <li>Проведение рекламных и информационных рассылок (с согласия Пользователя);</li>
              <li>Обеспечение технического контроля, аналитики и соблюдение требований законодательства Республики Узбекистан.</li>
            </ul>
            <p className="pt-2">
              <strong className="text-slate-800">3.2.</strong> Обработка персональных данных включает в себя: сбор, систематизацию, хранение, изменение, дополнение, использование, предоставление, распространение, обезличивание, блокирование и уничтожение персональных данных.
            </p>
            <p>
              <strong className="text-slate-800">3.3.</strong> Обработка осуществляется как с использованием средств автоматизации (включая передачу полученной информации по информационно-коммуникационным сетям), так и без использования таких средств (смешанная обработка).
            </p>
            <p>
              <strong className="text-slate-800">3.4. Трансграничная передача:</strong> Пользователь выражает согласие на трансграничную передачу своих персональных данных на территорию иностранных государств (например, при использовании серверов веб-аналитики или почтовых сервисов), в том числе в страны, которые могут не обеспечивать адекватный уровень защиты персональных данных, принимая возможные риски, связанные с такой передачей.
            </p>
          </section>

          {/* Раздел 4 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              4. Права и обязанности сторон
            </h4>
            <p className="font-semibold text-slate-800">4.1. Пользователь имеет право:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Получать информацию, касающуюся обработки его персональных данных;</li>
              <li>Требовать от Оператора уточнения, блокирования или уничтожения своих персональных данных в случаях, если они являются неполными, устаревшими, неточными или полученными незаконно;</li>
              <li>Отзывать согласие на обработку персональных данных.</li>
            </ul>

            <p className="font-semibold text-slate-800 pt-2">4.2. Права Оператора:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Использовать персональные данные Пользователя для отправки сервисных, рекламных и информационных сообщений;</li>
              <li>Передавать персональные данные третьим лицам (включая партнеров по проведению акций, конкурсов и мероприятий) в целях реализации условий предоставления услуг и ведения отчетности.</li>
            </ul>
          </section>

          {/* Раздел 5 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              5. Порядок отзыва согласия и удаления данных
            </h4>
            <p>
              <strong className="text-slate-800">5.1.</strong> Пользователь вправе в любое время отозвать согласие на обработку персональных данных и запросить их удаление, направив официальное письменное обращение на адрес электронной почты Администрации Сайта: <a href="mailto:yanyarushin@gmail.com" className="text-[#1E9646] font-semibold hover:underline">yanyarushin@gmail.com</a>.
            </p>
            <p>
              <strong className="text-slate-800">5.2.</strong> Оператор в соответствии со статьей 18 Закона РУз № ЗРУ-547 «О персональных данных» обязан прекратить обработку персональных данных и уничтожить их (или обеспечить их уничтожение) в течение 30 (тридцати) дней с даты получения соответствующего отзыва/запроса от Пользователя.
            </p>
            <p>
              <strong className="text-slate-800">5.3.</strong> В случаях, когда сохранение персональных данных требуется для целей налогового, бухгалтерского учета или соблюдения иного законодательства Республики Узбекистан, Оператор вправе продолжить хранение персональных данных в объеме и на сроки, строго предусмотренные действующим законодательством РУз.
            </p>
            <p>
              <strong className="text-slate-800">5.4.</strong> Персональные данные, переданные с согласия Пользователя третьим лицам (партнерам, аналитическим платформам), обрабатываются этими лицами в соответствии с их собственными политиками конфиденциальности и не входят в зону ответственности Оператора.
            </p>
          </section>

          {/* Раздел 6 */}
          <section className="space-y-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              6. Заключительные положения
            </h4>
            <p>
              <strong className="text-slate-800">6.1.</strong> Настоящая Политика вступает в силу с момента ее опубликования на Сайте и действует бессрочно до замены ее новой редакцией.
            </p>
            <p>
              <strong className="text-slate-800">6.2.</strong> Оператор имеет право в одностороннем порядке вносить изменения в настоящую Политику без предварительного уведомления Пользователя. Новая редакция Политики вступает в силу с момента ее размещения на Сайте.
            </p>
            <p>
              <strong className="text-slate-800">6.3.</strong> К отношениям между Пользователем и Оператором в сфере обработки персональных данных применяется право Республики Узбекистан.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
