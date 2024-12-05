/*问候语*/
function Timeauto(): string {
    const date = new Date();
    const hours = date.getHours();

    if(hours >=7 && hours <= 11){
        return "早上好,先生"
    }else if(hours >=12 && hours <= 13){
        return "中午好,吃了么？"
    }else if(hours >=14 && hours <= 17){
        return "下午好,祝您工作愉快"
    }else {
        return "晚上好,先生,要喝点咖啡提提神么？"
    }
}

const Home = () => {

    const title = Timeauto()

    return (
        <section className="home">
            <div className="home-content">
                HeaderBox
                {title}
            </div>
        </section>
    )
}

export default Home;
