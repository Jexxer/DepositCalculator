import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import DashboardImage from "../../assets/site_dashboard.png"
import { useAppSelector } from '@/Redux/hooks'
import { Link } from 'react-router-dom'

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
// ]
const features = [
  {
    name: 'Manage Multiple Accounts',
    description:
      'Easily add and manage several bank accounts within DepositCalc. Seamlessly track and organize your expenses, ensuring accurate and efficient management of your direct deposit allocations for all your financial needs.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Distribute Incomes Efficiently',
    description:
      'Split your various incomes across selected accounts using DepositCalc. Customize distribution by percentage or amount, ensuring that each account gets funded according to preset criteria for maximum flexibility and convenience.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simplify Shared Expenses',
    description:
      'Ideal for families and roommates, DepositCalc allows users to manage shared expenses effortlessly. Automate the allocation process and avoid disputes by ensuring each person contributes their share directly to the relevant accounts.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Privacy First',
    description:
      'DepositCalc is designed with privacy in mind. We don’t link to or store any personal bank information; instead, you create placeholder bank accounts to represent where expenses are managed. Your data remains safe and secure.',
    icon: FingerPrintIcon,
  },
]
// const tiers = [
//   {
//     name: 'Freelancer',
//     id: 'tier-freelancer',
//     href: '#',
//     priceMonthly: '$19',
//     description: 'The essentials to provide your best work for clients.',
//     features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
//     mostPopular: false,
//   },
//   {
//     name: 'Startup',
//     id: 'tier-startup',
//     href: '#',
//     priceMonthly: '$49',
//     description: 'A plan that scales with your rapidly growing business.',
//     features: [
//       '25 products',
//       'Up to 10,000 subscribers',
//       'Advanced analytics',
//       '24-hour support response time',
//       'Marketing automations',
//     ],
//     mostPopular: true,
//   },
//   {
//     name: 'Enterprise',
//     id: 'tier-enterprise',
//     href: '#',
//     priceMonthly: '$99',
//     description: 'Dedicated support and infrastructure for your company.',
//     features: [
//       'Unlimited products',
//       'Unlimited subscribers',
//       'Advanced analytics',
//       '1-hour, dedicated support response time',
//       'Marketing automations',
//     ],
//     mostPopular: false,
//   },
// ]
const faqs = [
  {
    id: 1,
    question: "How can DepositCalc streamline my deposit management process?",
    answer:
      "With today’s automatic payments and subscription models, it’s easy to lose track of expenses. DepositCalc offers a straightforward solution: simply input your income, set up bank account placeholders, and manually add each recurring expense with its amount and the account it’s billed from. Based on this information, DepositCalc calculates how to arrange your direct deposits, ensuring you’ll have the necessary funds in place each month—no more guessing if you’ll cover all expenses. By setting up DepositCalc, you can manage your finances with ease, setting it once and gaining peace of mind.",
  },
  {
    id: 2,
    question: "Is my financial information secure with DepositCalc?",
    answer:
      "DepositCalc is designed with privacy in mind. We don’t link to or store any personal bank information; instead, you create placeholder bank accounts to represent where expenses are managed. Your data remains on your device and secure.",
  },
  {
    id: 3,
    question: "Can I manage multiple income sources with DepositCalc?",
    answer:
      "Absolutely. DepositCalc lets you add and track multiple income sources to ensure all your earnings are considered when setting up direct deposits. You can even designate which income is associated with your insurance provider, giving you complete control over how specific expenses are funded. This flexibility helps you tailor your finances to meet your unique needs effectively.",
  },
]
// const footerNavigation = {
//   solutions: [
//     { name: 'Hosting', href: '#' },
//     { name: 'Data services', href: '#' },
//     { name: 'Uptime monitoring', href: '#' },
//     { name: 'Enterprise services', href: '#' },
//     { name: 'Analytics', href: '#' },
//   ],
//   support: [
//     { name: 'Submit ticket', href: '#' },
//     { name: 'Documentation', href: '#' },
//     { name: 'Guides', href: '#' },
//   ],
//   company: [
//     { name: 'About', href: '#' },
//     { name: 'Blog', href: '#' },
//     { name: 'Jobs', href: '#' },
//     { name: 'Press', href: '#' },
//   ],
//   legal: [
//     { name: 'Terms of service', href: '#' },
//     { name: 'Privacy policy', href: '#' },
//     { name: 'License', href: '#' },
//   ],
// }

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">DepositCalc</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12"> */}
          {/*   {navigation.map((item) => ( */}
          {/*     <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900"> */}
          {/*       {item.name} */}
          {/*     </a> */}
          {/*   ))} */}
          {/* </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to={isAuthenticated ? "/dashboard" : "/dashboard"} className="text-sm/6 font-semibold text-gray-900">
              {isAuthenticated ? "Dashboard" : "Log in"}<span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">DepositCalc</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* {navigation.map((item) => ( */}
                  {/*   <a */}
                  {/*     key={item.name} */}
                  {/*     href={item.href} */}
                  {/*     className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" */}
                  {/*   > */}
                  {/*     {item.name} */}
                  {/*   </a> */}
                  {/* ))} */}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr 
from-[#80b5ff] to-[#89fcfc]
 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                  Simplify your direct deposits
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Streamline deposit management with ease and efficiency across all accounts with our seamless solution
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/register"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <a href="#feature-section" className="text-sm/6 font-semibold text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    alt="App screenshot"
                    src={DashboardImage}
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80b5ff] to-[#89fcfc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Logo cloud */}
        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
        {/*   <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"> */}
        {/*     <img */}
        {/*       alt="Transistor" */}
        {/*       src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg" */}
        {/*       width={158} */}
        {/*       height={48} */}
        {/*       className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" */}
        {/*     /> */}
        {/*     <img */}
        {/*       alt="Reform" */}
        {/*       src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg" */}
        {/*       width={158} */}
        {/*       height={48} */}
        {/*       className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" */}
        {/*     /> */}
        {/*     <img */}
        {/*       alt="Tuple" */}
        {/*       src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg" */}
        {/*       width={158} */}
        {/*       height={48} */}
        {/*       className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" */}
        {/*     /> */}
        {/*     <img */}
        {/*       alt="SavvyCal" */}
        {/*       src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg" */}
        {/*       width={158} */}
        {/*       height={48} */}
        {/*       className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" */}
        {/*     /> */}
        {/*     <img */}
        {/*       alt="Statamic" */}
        {/*       src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg" */}
        {/*       width={158} */}
        {/*       height={48} */}
        {/*       className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" */}
        {/*     /> */}
        {/*   </div> */}
        {/*   <div className="mt-16 flex justify-center"> */}
        {/*     <p className="relative rounded-full px-4 py-1.5 text-sm/6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20"> */}
        {/*       <span className="hidden md:inline"> */}
        {/*         Transistor saves up to $40,000 per year, per employee by working with us. */}
        {/*       </span> */}
        {/*       <a href="#" className="font-semibold text-indigo-600"> */}
        {/*         <span aria-hidden="true" className="absolute inset-0" /> Read our case study{' '} */}
        {/*         <span aria-hidden="true">&rarr;</span> */}
        {/*       </a> */}
        {/*     </p> */}
        {/*   </div> */}
        {/* </div> */}

        {/* Feature section */}
        <div id="feature-section" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Calculate faster</h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              Streamline deposit management with ease and efficiency.
            </p>
            <p className="mt-6 text-pretty text-lg/8 text-gray-600">
              DepositCalc helps you manage multiple bank accounts, incomes, and expenses effectively. By calculating exactly where your paycheck needs to go, our tool ensures that your direct deposits are set up correctly and distributed according to your unique needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Testimonial section */}
        {/* <div className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8"> */}
        {/*   <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20"> */}
        {/*     <img */}
        {/*       alt="" */}
        {/*       src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80" */}
        {/*       className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0" */}
        {/*     /> */}
        {/*     <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" /> */}
        {/*     <div aria-hidden="true" className="absolute -left-80 -top-56 transform-gpu blur-3xl"> */}
        {/*       <div */}
        {/*         style={{ */}
        {/*           clipPath: */}
        {/*             'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', */}
        {/*         }} */}
        {/*         className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#80b5ff] to-[#89fcfc] opacity-[0.45]" */}
        {/*       /> */}
        {/*     </div> */}
        {/*     <div */}
        {/*       aria-hidden="true" */}
        {/*       className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl" */}
        {/*     > */}
        {/*       <div */}
        {/*         style={{ */}
        {/*           clipPath: */}
        {/*             'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', */}
        {/*         }} */}
        {/*         className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#80b5ff] to-[#89fcfc] opacity-25" */}
        {/*       /> */}
        {/*     </div> */}
        {/*     <div className="relative mx-auto max-w-2xl lg:mx-0"> */}
        {/*       <img */}
        {/*         alt="" */}
        {/*         src="https://tailwindui.com/plus/img/logos/workcation-logo-white.svg" */}
        {/*         className="h-12 w-auto" */}
        {/*       /> */}
        {/*       <figure> */}
        {/*         <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8"> */}
        {/*           <p> */}
        {/*             “Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu praesent at a. Ornare */}
        {/*             arcu gravida natoque erat et cursus tortor consequat at. Vulputate gravida sociis enim nullam */}
        {/*             ultricies habitant malesuada lorem ac.” */}
        {/*           </p> */}
        {/*         </blockquote> */}
        {/*         <figcaption className="mt-6 text-base text-white"> */}
        {/*           <div className="font-semibold">Judith Black</div> */}
        {/*           <div className="mt-1">CEO of Tuple</div> */}
        {/*         </figcaption> */}
        {/*       </figure> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}

        {/* Pricing section */}
        {/* <div className="py-24 sm:pt-48"> */}
        {/*   <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
        {/*     <div className="mx-auto max-w-2xl lg:text-center"> */}
        {/*       <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2> */}
        {/*       <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"> */}
        {/*         Pricing that grows with you */}
        {/*       </p> */}
        {/*       <p className="mt-6 text-pretty text-lg/8 text-gray-600"> */}
        {/*         Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum */}
        {/*         pulvinar et feugiat blandit at. In mi viverra elit nunc. */}
        {/*       </p> */}
        {/*     </div> */}
        {/*     <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"> */}
        {/*       {tiers.map((tier, tierIdx) => ( */}
        {/*         <div */}
        {/*           key={tier.id} */}
        {/*           className={classNames( */}
        {/*             tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8', */}
        {/*             tierIdx === 0 ? 'lg:rounded-r-none' : '', */}
        {/*             tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '', */}
        {/*             'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10', */}
        {/*           )} */}
        {/*         > */}
        {/*           <div> */}
        {/*             <div className="flex items-center justify-between gap-x-4"> */}
        {/*               <h3 */}
        {/*                 id={tier.id} */}
        {/*                 className={classNames( */}
        {/*                   tier.mostPopular ? 'text-indigo-600' : 'text-gray-900', */}
        {/*                   'text-lg/8 font-semibold', */}
        {/*                 )} */}
        {/*               > */}
        {/*                 {tier.name} */}
        {/*               </h3> */}
        {/*               {tier.mostPopular ? ( */}
        {/*                 <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600"> */}
        {/*                   Most popular */}
        {/*                 </p> */}
        {/*               ) : null} */}
        {/*             </div> */}
        {/*             <p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p> */}
        {/*             <p className="mt-6 flex items-baseline gap-x-1"> */}
        {/*               <span className="text-4xl font-semibold tracking-tight text-gray-900">{tier.priceMonthly}</span> */}
        {/*               <span className="text-sm/6 font-semibold text-gray-600">/month</span> */}
        {/*             </p> */}
        {/*             <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600"> */}
        {/*               {tier.features.map((feature) => ( */}
        {/*                 <li key={feature} className="flex gap-x-3"> */}
        {/*                   <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" /> */}
        {/*                   {feature} */}
        {/*                 </li> */}
        {/*               ))} */}
        {/*             </ul> */}
        {/*           </div> */}
        {/*           <a */}
        {/*             href={tier.href} */}
        {/*             aria-describedby={tier.id} */}
        {/*             className={classNames( */}
        {/*               tier.mostPopular */}
        {/*                 ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500' */}
        {/*                 : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300', */}
        {/*               'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', */}
        {/*             )} */}
        {/*           > */}
        {/*             Buy plan */}
        {/*           </a> */}
        {/*         </div> */}
        {/*       ))} */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}

        {/* FAQs */}
        <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative -z-10 mt-32 px-6 lg:px-8 pb-28">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
          >
            <div
              style={{
                clipPath:
                  'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)',
              }}
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Boost your productivity. Start using our app today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              {/* <a href="#" className="text-sm/6 font-semibold text-gray-900"> */}
              {/*   Learn more <span aria-hidden="true">→</span> */}
              {/* </a> */}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-full -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="mx-auto mt-32 max-w-7xl px-6 lg:px-8"> */}
      {/*   <div className="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32"> */}
      {/*     <div className="xl:grid xl:grid-cols-3 xl:gap-8"> */}
      {/*       <img */}
      {/*         alt="Company name" */}
      {/*         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" */}
      {/*         className="h-9" */}
      {/*       /> */}
      {/*       <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"> */}
      {/*         <div className="md:grid md:grid-cols-2 md:gap-8"> */}
      {/*           <div> */}
      {/*             <h3 className="text-sm/6 font-semibold text-gray-900">Solutions</h3> */}
      {/*             <ul role="list" className="mt-6 space-y-4"> */}
      {/*               {footerNavigation.solutions.map((item) => ( */}
      {/*                 <li key={item.name}> */}
      {/*                   <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900"> */}
      {/*                     {item.name} */}
      {/*                   </a> */}
      {/*                 </li> */}
      {/*               ))} */}
      {/*             </ul> */}
      {/*           </div> */}
      {/*           <div className="mt-10 md:mt-0"> */}
      {/*             <h3 className="text-sm/6 font-semibold text-gray-900">Support</h3> */}
      {/*             <ul role="list" className="mt-6 space-y-4"> */}
      {/*               {footerNavigation.support.map((item) => ( */}
      {/*                 <li key={item.name}> */}
      {/*                   <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900"> */}
      {/*                     {item.name} */}
      {/*                   </a> */}
      {/*                 </li> */}
      {/*               ))} */}
      {/*             </ul> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*         <div className="md:grid md:grid-cols-2 md:gap-8"> */}
      {/*           <div> */}
      {/*             <h3 className="text-sm/6 font-semibold text-gray-900">Company</h3> */}
      {/*             <ul role="list" className="mt-6 space-y-4"> */}
      {/*               {footerNavigation.company.map((item) => ( */}
      {/*                 <li key={item.name}> */}
      {/*                   <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900"> */}
      {/*                     {item.name} */}
      {/*                   </a> */}
      {/*                 </li> */}
      {/*               ))} */}
      {/*             </ul> */}
      {/*           </div> */}
      {/*           <div className="mt-10 md:mt-0"> */}
      {/*             <h3 className="text-sm/6 font-semibold text-gray-900">Legal</h3> */}
      {/*             <ul role="list" className="mt-6 space-y-4"> */}
      {/*               {footerNavigation.legal.map((item) => ( */}
      {/*                 <li key={item.name}> */}
      {/*                   <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900"> */}
      {/*                     {item.name} */}
      {/*                   </a> */}
      {/*                 </li> */}
      {/*               ))} */}
      {/*             </ul> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </footer> */}
    </div>
  )
}
