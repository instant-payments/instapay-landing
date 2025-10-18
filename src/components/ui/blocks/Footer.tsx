import React from 'react';
import { Instagram, Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Brand from './Brand';

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Brand withLogo={false} clickable />

            <p className="text-gray-400 mb-6 max-w-md">{t('footer.description')}</p>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* <div>
            <h4 className="font-semibold mb-4">{t('footer.sections.product.title')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  {t('footer.sections.product.features')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {t('footer.sections.product.pricing')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.sections.product.integrations')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.sections.product.api')}
                </a>
              </li>
            </ul>
          </div> */}

          {/* <div>
            <h4 className="font-semibold mb-4">{t('footer.sections.support.title')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t('footer.sections.support.faq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.sections.support.helpCenter')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.sections.support.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.sections.support.status')}
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <div id="faq" className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold mb-8 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2" />
            {t('footer.faq.title')}
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-2">{t('footer.faq.license.question')}</h4>
              <p className="text-gray-400 text-sm">{t('footer.faq.license.answer')}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t('footer.faq.setup.question')}</h4>
              <p className="text-gray-400 text-sm">{t('footer.faq.setup.answer')}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t('footer.faq.paymentMethods.question')}</h4>
              <p className="text-gray-400 text-sm">{t('footer.faq.paymentMethods.answer')}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t('footer.faq.customization.question')}</h4>
              <p className="text-gray-400 text-sm">{t('footer.faq.customization.answer')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.legal.privacy')}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
