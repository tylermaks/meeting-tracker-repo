import { useState } from 'react'

function SupportRequestCard({ company }) {
    const [contactView, setContactView] = useState(false)

    contactView 
        ? <div>

        </div>

        :<div>
            <div>
                
            </div>
            <h3>{company}</h3>
        </div>
}

export default SupportRequestCard