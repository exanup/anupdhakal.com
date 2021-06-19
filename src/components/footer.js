/** @jsx jsx */
import { jsx } from 'theme-ui'
import { RiHeart2Line } from 'react-icons/ri'

const Footer = () => (
    <footer
        className="site-footer"
        sx={{
            bg: 'siteColor',
        }}
    >
        <div className="container">
            <p>
                © All rights reserved. Made with{' '}
                <span className="icon -love">
                    <RiHeart2Line />
                </span>{' '}
                by{' '}
                <a
                    href="https://stackrole.com/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    Stackrole.com
                </a>
            </p>
        </div>
    </footer>
)

export default Footer
