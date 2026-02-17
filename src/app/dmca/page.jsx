export const metadata = {
  title: "DMCA & Disclaimer – BEEBI TV",
  description:
    "DMCA policy, copyright notice, and legal disclaimer for BEEBI TV.",
};

export default function DMCA() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Page title */}
      <div className="mb-10">
        <div className="section-label">Legal</div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-100 mb-3">
          DMCA &amp; Disclaimer
        </h1>
        <p className="text-sm text-muted">Last updated: February 2026</p>
      </div>

      <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
        {/* Disclaimer */}
        <section className="cyber-card rounded-lg p-6">
          <h2 className="text-lg font-black text-gray-100 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-red" />
            Disclaimer
          </h2>
          <p className="mb-3">
            BEEBI TV does not host, upload, or store any video content on its
            servers. All streams and videos displayed on this website are
            provided by third-party services and are publicly available on the
            internet.
          </p>
          <p className="mb-3">
            This site acts as a search engine / link aggregator that indexes
            content already freely accessible across the web. We do not have
            control over the content, nature, or availability of these external
            streaming sources.
          </p>
          <p>
            BEEBI TV is not responsible for the legality or content of external
            websites linked to or embedded within this platform. Users access all
            content at their own discretion and risk.
          </p>
        </section>

        {/* DMCA */}
        <section className="cyber-card rounded-lg p-6">
          <h2 className="text-lg font-black text-gray-100 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan" />
            DMCA Notice
          </h2>
          <p className="mb-3">
            BEEBI TV respects the intellectual property rights of others and
            expects its users to do the same. If you believe that your
            copyrighted work has been linked or indexed in a way that constitutes
            copyright infringement, please provide our designated copyright agent
            with the following information:
          </p>
          <ul className="list-none space-y-2 mb-4">
            {[
              "A physical or electronic signature of a person authorized to act on behalf of the copyright owner.",
              "Identification of the copyrighted work claimed to have been infringed.",
              "Identification of the material that is claimed to be infringing, with enough detail to locate it.",
              "Your contact information — address, telephone number, and email address.",
              "A statement that you have a good faith belief that the disputed use is not authorized.",
              "A statement, under penalty of perjury, that the information in the notification is accurate.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-neon-red font-bold font-mono text-xs mt-0.5">
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Send DMCA notices to:{" "}
            <span className="text-neon-cyan font-bold">
              dmca@beebimedia.com
            </span>
          </p>
        </section>

        {/* Copyright */}
        <section className="cyber-card rounded-lg p-6">
          <h2 className="text-lg font-black text-gray-100 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-purple" />
            Copyright Notice
          </h2>
          <p className="mb-3">
            All trademarks, service marks, trade names, logos, and brand features
            appearing on this website are the property of their respective
            owners. BEEBI TV is not affiliated with, endorsed by, or sponsored
            by any sports league, broadcasting company, or content provider.
          </p>
          <p>
            The use of any trade name or trademark is for identification and
            reference purposes only and does not imply any association with the
            trademark holder.
          </p>
        </section>

        {/* Terms */}
        <section className="cyber-card rounded-lg p-6">
          <h2 className="text-lg font-black text-gray-100 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green" />
            Terms of Use
          </h2>
          <p className="mb-3">
            By using BEEBI TV, you agree to use the service for personal,
            non-commercial purposes only. You acknowledge that you are solely
            responsible for your use of this site and any content you access
            through it.
          </p>
          <p className="mb-3">
            We reserve the right to modify or discontinue the service at any time
            without notice. We shall not be liable for any modification,
            suspension, or discontinuation of the service.
          </p>
          <p>
            This website uses cookies and similar tracking technologies to
            improve your browsing experience. By continuing to use this website,
            you consent to our use of cookies.
          </p>
        </section>

        {/* Contact */}
        <section className="cyber-card rounded-lg p-6">
          <h2 className="text-lg font-black text-gray-100 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-yellow" />
            Contact
          </h2>
          <p>
            For any questions, concerns, or DMCA takedown requests, please reach
            out to us at{" "}
            <span className="text-neon-cyan font-bold">
              contact@beebimedia.com
            </span>
            . We aim to respond to all inquiries within 48 hours.
          </p>
        </section>
      </div>
    </main>
  );
}
