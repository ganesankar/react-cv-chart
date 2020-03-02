import { map as _map } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timeline from "react-visjs-timeline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PieChart from "highcharts-react-official";
import HighchartsXrange from "highcharts/modules/xrange";
HighchartsXrange(Highcharts);
import moment from "moment";
import { fetchPosts } from "../actions";

export function getDate(tdate) {
  const pD =
    tdate === "c" || tdate === "p"
      ? moment(new Date()).format("DD/MM/YYYY")
      : tdate;
  const p = moment(pD, ["DD/MM/YYYY"]).format("YYYY-MM-DD");

  return p;
}

export function getUTCDate(tdate) {
  const pD =
    tdate === "c" || tdate === "p" ? moment().format("DD/MM/YYYY") : tdate;
  const p = moment(pD, ["DD/MM/YYYY"]).format("x");
  return Number(p);
}
const StyleAxis1 = {
                fontSize: '13px',
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'
            }
const gridLineColor1 = '#383943';   
const StyletoolTip1 = {
        backgroundColor: '#27293d',
        style: {
            color: '#F0F0F0'
        }  } ;   
class VisTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawCharts: false,
      expertConfig: {
         title: false,
        legend: {},
        credits: false,
        subtitle: false,
  chart: {
    type: "pie",
     backgroundColor: "#27293d"
  },
  series: [
    {
      data: [
        {
          y: 100
        },
        {
          y: 100
        }
      ]
    }
  ]
},
      skillConfig: {
        title: false,
        legend: {},
        credits: false,
        subtitle: false,
        chart: {
          type: "column",
          backgroundColor: "#27293d",
          plotBorderColor: '#606063'
        },
        tooltip:StyletoolTip1,
        xAxis: {
          gridLineColor: '#707073',
          lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
          categories: [],
          
          labels: {
            rotation: -45,
            style: StyleAxis1
        }
        },
        gridLineColor: '#707073',
        yAxis: [
          {
            gridLineColor: gridLineColor1,
        tickColor:gridLineColor1,
            title: {
              text: "Percentage"
            },
          },
        ],
        series: [{ data: [],dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: StyleAxis1
        } } ]
      },
      expConfig: {
        chart: {
          type: "xrange",
          backgroundColor: "#27293d"
        },
        title: false,
        xAxis: {
          type: "datetime"
        },
        yAxis: {
            gridLineColor: gridLineColor1,
        tickColor:gridLineColor1,
          title: false,
          categories: [],
          reversed: true
        },
        legend: {},
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Experience",
            pointWidth: 30,
            pointPadding: 0,
            groupPadding: 0,
            data: [],
            dataLabels: {
              enabled: true,
              color: "#FFFFFF",
              format: "{point.z}",
              style: StyleAxis1,
              y: 1
            }
          }
        ]
      },
      eduConfig: {
        chart: {
          type: "xrange",
          backgroundColor: "#27293d"
        },
        title: false,
        xAxis: {
          type: "datetime"
        },
        yAxis: {
            gridLineColor: gridLineColor1,
        tickColor:gridLineColor1,
          title: false,
          categories: [],
          reversed: true
        },
        legend: {},
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Experience",
            pointWidth: 30,
            pointPadding: 0,
            groupPadding: 0,
            data: [],
            dataLabels: {
              enabled: true,
              color: "#FFFFFF",
              format: "{point.z}",
              y: 1,
              style: StyleAxis1
            }
          }
        ]
      },

      awardConfig: {
        chart: {
          type: "xrange",
          backgroundColor: "#27293d"
        },
        title: false,
        xAxis: {
          type: "datetime"
        },
        yAxis: {
            gridLineColor: gridLineColor1,
        tickColor:gridLineColor1,
          title: false,
          categories: [],
          reversed: true
        },
        legend: {},
        credits: {
          enabled: false
        },
        series: [
          {
            name: "Awards",
            pointWidth: 30,
            pointPadding: 0,
            groupPadding: 0,
            data: [],
            dataLabels: {
              enabled: true,
              color: "#FFFFFF",
              format: "{point.z}",
              y: 1,
              style: StyleAxis1
            }
          }
        ]
      },
      isLoading: true,
      loadOnce: false,
      notimeline: ["intro", "contacts", "social", "expertise", "profile" , "otherprojects"],
      contentdata: [],
      customTimes: {
        marker: new Date()
      },
      groups: [
       
      ],
      options: {
        width: "100%",
        //height:  window.innerHeight,stack: false,
  showMajorLabels: true,
        orientation: { axis: "top", item: "top" },
        zoomMax: 946080000000,
        zoomMin: 31536000000,
        max: new Date(),
        min: new Date("06/26/1987"),
        selectable: true
      },
      items: [
        
        {
          id: 900001,
          content: "Education",
          start: "1990-06-14",
          end: "2008-01-20",
          type: "background"
        },
        {
          id: 900002,
          content: "Experience",
          start: "2009-05-25",
          end: getDate("c"),
          type: "background"
        },
        {          type: "point",
          id: 66601,
                  start: '1987-01-20',
                  end: '1990-06-02', // end is optional
                  content: '<i class="fas fa-birthday-cake"></i> Born in Tanjore',
                  className: 'Life'
                },
                {          type: "point",
          id: 66602,
                  start: '1990-06-02',
                  end: '2004-06-02', // end is optional
                  content: '<i class="fas fa-school"></i> Started Schooling',
                  className: 'Life'
                },
                {          type: "point",
          id: 66603,
                  start: '2004-06-02',
                  end: '2008-06-02', // end is optional
                  content: '<i class="fas fa-map-marked-alt"></i> Moved Trichy',
                  className: 'Life'
                },
                {          type: "point",
          id: 66604,
                  start: '2009-08-02',
                  end: '2008-06-02', // end is optional
                  content: '<i class="fas fa-map-marked-alt"></i> Moved Chennai',
                  className: 'Life'
                }
      ]
    };
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps) {
    const { notimeline } = this.state;
    let {
      items,
      skillConfig,
      expConfig,
      eduConfig,
      awardConfig,
      drawCharts
    } = this.state;
    console.log("nextProps", nextProps.posts);
    if (nextProps.posts !== this.props.posts) {
      const { posts } = nextProps.posts;
      const contentdata = [];
      const content = [];
      const groups = [];
      groups.push( {
              id: 0,
              content: 'LIFE',
              type: 'life',
              active:false
            });
      if (nextProps.posts.length > 0) {
        nextProps.posts.forEach(function(item, index) {
          content.push(item.data);
        });
        contentdata = content.sort((a, b) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );

        contentdata.forEach(function(item, index) {
          if (!notimeline.includes(item.type)) {
            //console.log(" ");
            //console.log("type", item.type);
            var grpi = {
              id: index,
              content: item.name.toUpperCase(),
              type: item.type,
              active:false
            };
            if (item.values) {
              item.values.forEach(function(itemx, indexx) {
                //console.log("itemx", itemx);

                const newI = {
                  start: getDate(itemx.startdate),
                  end: getDate(itemx.enddate || 'c'), // end is optional
                  content: itemx.name || itemx.title,
                 ctype: item.type,
                  className: item.type
                };
                if (item.type == "skills") {
                 
                  newI.content = `<i class="fas fa-tools"></i> ${itemx.name} : ${itemx.percentage}`;
                  skillConfig.xAxis.categories.push(itemx.name);
                  skillConfig.series[0].data.push(Number(itemx.percentage));
                }
                if (item.type == "experience") {
                   newI.content = `<i class="fas fa-business-time"></i> ${itemx.name} `; 
                  expConfig.yAxis.categories.push(itemx.company);
                  const Dateres = {
                    x: getUTCDate(itemx.startdate),
                    x2: getUTCDate(itemx.enddate),
                    y: indexx,
                    z: itemx.name
                  };
                  expConfig.series[0].data.push(Dateres);
                }
                
                if (item.type == "education") {   
                   newI.content = `<i class="fas fa-graduation-cap"></i> ${itemx.name} `;               
                  eduConfig.yAxis.categories.push(itemx.name);
                  const Dateres = {
                    x: getUTCDate(itemx.startdate),
                    x2: getUTCDate(itemx.enddate),
                    y: indexx,
                    z: itemx.institute
                  };
                  eduConfig.series[0].data.push(Dateres);
                }
                if (item.type == "awards") {   
                    newI.type = "point";   
                     newI.content = `<i class="fas fa-award"></i> ${itemx.name} `;             
                  awardConfig.yAxis.categories.push(itemx.name);
                  const Dateres = {
                    x: getUTCDate(itemx.startdate),
                    x2: getUTCDate(itemx.enddate),
                    y: indexx,
                    z: itemx.institute
                  };
                  awardConfig.series[0].data.push(Dateres);
                }

                items.push(newI);
                //console.log("item", newI);
              });
            }
            
            groups.push(grpi);
          }
        });
        //console.log("contentdata", contentdata);console.log("items", items);
        this.setState({
          contentdata,
          groups,
          items,
          skillConfig,
          expConfig,
awardConfig,
          drawCharts: true
        });
      }
    }
  }

  clickHandler(props) {
    console.log(props);
  }
  selectHandler(props) {
    console.log("selected");
    console.log(props);
  }

  render() {
    const { posts } = this.props;
    const {
      contentdata,
      options,
      items,
      customTimes,
      groups,
      skillConfig,
      drawCharts,
      expConfig,
      eduConfig,
      awardConfig,
      expertConfig
    } = this.state;
    console.log("post", posts);
    
    const introContent = contentdata.find(o => o.type === 'intro');
    const socialContent = contentdata.find(o => o.type === 'social');
     const otherProj = contentdata.find(o => o.type === 'otherprojects');
     
     const profile = contentdata.find(o => o.type === 'profile');     
     const contact = contentdata.find(o => o.type === 'contacts');   

    return (
      <div className="page-content-wrapper container-xl">
        <div className="row">
          <div className="col-12 col-lg-4 py-5">
            <h4>Ganesan Karuppaiya</h4>
            <p className="text-gray">Curriculum vitae Dashboard</p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
          {drawCharts && (
                  
               
            <div className="card-user card">
              <div className="card-body">
                <p className="card-text"></p>
                <div className="author">
                  <div className="block block-one"></div>
                  <div className="block block-two"></div>
                  <div className="block block-three"></div>
                  <div className="block block-four"></div>
                  <a href="#pablo">
                    <img
                      alt="..."
                      className="avatar"
                      src="/black-dashboard-react/static/media/emilyz.9fcf69e5.jpg"
                    />
                    <h3 className="title"> {introContent.name}</h3>
                  </a>
                  <p className="description"> {introContent.title}</p>
                </div>
                <div className="card-description" dangerouslySetInnerHTML={{__html: introContent.desc}}>
                 
                </div>
              </div>
              <div className="card-footer">
                <div className="button-container">

                {socialContent &&
          socialContent.values.length > 0 &&
          socialContent.values.map((item, index) => {
            return (
              <a 
              rel="noopener noreferrer"
                href={item.elink}
                target="_blank"
                className="btn-icon btn-round btn btn-facebook">
                    <i className={` fab  ${item.icon}`}></i> 
                  </a>
              
            );
          })}
                
                </div>
              </div>
            </div> )}
          </div>{" "}
          <div className="col-12 col-lg-8">
           <div className="row">
              
              <div className="col-12 col-sm-6 ">
                    <div className="card-stats card">
    <div className="card-body">
        <div className="row">
            <div className="col-5">
                <div className="info-icon text-center icon-warning"><i className="tim-icons icon-chat-33"></i></div>
            </div>
            <div className="col-7">
                <div className="numbers">
                    <p className="card-category">You can get more about me!</p>
                    <h3 className="card-title"> Profile Links</h3></div>
            </div>
        </div>
    </div>
    <div className="card-footer">
        <hr/>
       
    <div className="row ml-0 mr-0">
    {profile &&
          profile.values.length > 0 &&
          profile.values.map((item, index) => {
            return (
              <a 
              rel="noopener noreferrer"
                href={item.link}
                target="_blank"
                className="ml-auto mr-auto col-3 "> <span className="card-stats justify-content-center">
                    <i className={` fab  ${item.icon}`}></i> {item.name}</span> 
                  </a>
              
            );
          })}
        
       
    </div>
    </div>
</div>
              </div>
               <div className="col-12 col-sm-6 ">
                    <div className="card-stats card">
    <div className="card-body">
        <div className="row">
            <div className="col-5">
                <div className="info-icon text-center icon-warning"><i className="tim-icons icon-chat-33"></i></div>
            </div>
            <div className="col-7">
                <div className="numbers">
                    <p className="card-category">Ways to reach me!</p>
                    <h3 className="card-title"> Contacts</h3></div>
            </div>
        </div>
    </div>
    <div className="card-footer">
        <hr/>
       
    <div className="row ml-0 mr-0">
    {contact &&
          contact.values.length > 0 &&
          contact.values.map((item, index) => {
            return (
              <a 
              rel="noopener noreferrer"
                href={item.link}
                target="_blank"
                className="ml-auto mr-auto col-3 "> <span className="card-stats justify-content-center">
                    <i className={` fab  ${item.icon}`}></i> {item.name}</span> 
                  </a>
              
            );
          })}
        
       
    </div>
    </div>
</div>
              </div>
              
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 ">
                <div className="card-chart card">
                  <div className="card-header">
                    <h5 className="card-category">Areas I am working in as</h5>
                    <h3 className="card-title">
                      <i className="tim-icons icon-bell-55 text-info"></i>{" "}
                      Expertise
                    </h3>
                  </div>
                  <div className="card-body">
               
      {drawCharts && (
                          <PieChart highcharts={Highcharts} options={expertConfig} />
                    )}
                  </div>
                </div>
              </div>{" "}
              <div className="col-12 col-sm-6 ">
                <div className="card-chart card">
                  <div className="card-header">
                    <h5 className="card-category">Progress bars to list </h5>
                    <h3 className="card-title">
                      <i className="tim-icons icon-bell-55 text-info"></i>{" "}
                       Skills
                    </h3>
                  </div>
                  <div className="card-body">
                    {drawCharts && (
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={skillConfig}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="row">
          <div className="col-12 col-sm-6 col-md-12 col-lg-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Yes. I've
                  been around. </h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i>  Experience
                </h3>
              </div>
              <div className="card-body">
                {drawCharts && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={expConfig}
                  />
                )}
              </div>
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category">  Lazy
                  isn't on</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i>Education
                </h3>
              </div>
              <div className="card-body">
                {drawCharts && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={eduConfig}
                  />
                )}
              </div>
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category">   Happy
                  times! while getting </h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i>Awards
                </h3>
              </div>
              <div className="card-body">
              {drawCharts && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={awardConfig}
                  />
                )}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 ">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Involved while working around </h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Projects
                </h3>
              </div>
              <div className="card-body"></div>
            </div>
          </div>{" "}
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Some things which cant be missed listed in</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Other Projects
                </h3>
              </div>
              <div className="card-body">
              <ol className="list-unstyled">
               {otherProj &&
          otherProj.values.length > 0 &&
          otherProj.values.map((item, index) => {
            return (
            <li className="pb-1 pl-1 pr-1">
    <h5 className="mt-0 mb-1">
       <a 
              rel="noopener noreferrer"
                href={item.link || item.portfolio}
                target="_blank"
                className="elp">
                    {item.name}
                  </a></h5>
  </li>
              
            );
          })}
          </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> History in one</h5>
                <h3 className="card-title float-left">
                  <i className="tim-icons icon-bell-55 text-info"></i> Timeline
                </h3>
                   <div data-toggle="buttons" role="group" class="btn-group-toggle float-right btn-group">
    

        {groups &&
          groups.length > 0 &&
          groups.map((item, index) => {
            return (
              <label id="2" class="btn-simple btn btn-info btn-sm">
        <input class="d-none" name="options" type="radio"/><span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">{item.content}</span><span class="d-block d-sm-none"><i class="tim-icons icon-tap-02"></i></span></label>
              
            );
          })}
</div>
              </div>
              <div className="card-body">

           
              {drawCharts && (
                   <Timeline
                  selectHandler={this.selectHandler}
                  options={options}
                  items={items}
                  customTimes={customTimes}
                />
                )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { fetchPosts })(VisTime);
