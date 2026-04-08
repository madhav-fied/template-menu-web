interface Notice {
    name: string
}

interface NoticesProps {
    notices: Array<Notice>
}

export default function Notices({ notices }: NoticesProps) {
    return (
        <div>
            {
                notices.map((notice, idx) => {
                    return (
                        <span key={idx.toString()}>
                            {notice.name}
                        </span>
                    )
                })
            }
        </div>
    );
}
