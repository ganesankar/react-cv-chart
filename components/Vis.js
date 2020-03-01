import { map as _map } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timeline from "react-visjs-timeline";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
      groups: [],
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
      if (nextProps.posts.length > 0) {
        nextProps.posts.forEach(function(item, index) {
          content.push(item.data);
        });
        contentdata = content.sort((a, b) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );

        contentdata.forEach(function(item, index) {
          if (!notimeline.includes(item.type)) {
            console.log(" ");
            console.log("type", item.type);
            var grpi = {
              id: index,
              content: item.name.toUpperCase()
            };
            if (item.values) {
              item.values.forEach(function(itemx, indexx) {
                console.log("itemx", itemx);

                const newI = {
                  start: getDate(itemx.startdate),
                  end: getDate(itemx.enddate || 'c'), // end is optional
                  content: itemx.name || itemx.title,
                 
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
                console.log("item", newI);
              });
            }
            groups.push(grpi);
          }
        });
        console.log("contentdata", contentdata);console.log("items", items);
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
      awardConfig
    } = this.state;
    console.log("post", posts);
    
    const introContent = contentdata.find(o => o.type === 'intro');
    const socialContent = contentdata.find(o => o.type === 'social');
    console.log("socialContent", socialContent);
    return (
      <div className="page-content-wrapper">
        <div className="row">
          <div className="col-12 py-5">
            <h4>Dashboard</h4>
            <p className="text-gray">Welcome aboard, Allen Clerk</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
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
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="card-chart card">
                  <div className="card-header">
                    <h5 className="card-category">Expertise</h5>
                    <h3 className="card-title">
                      <i className="tim-icons icon-bell-55 text-info"></i>{" "}
                      763,215
                    </h3>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>{" "}
              <div className="col-6">
                <div className="card-chart card">
                  <div className="card-header">
                    <h5 className="card-category"> Skills</h5>
                    <h3 className="card-title">
                      <i className="tim-icons icon-bell-55 text-info"></i>{" "}
                      Progress bars
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
          <div className="col-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Experience</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Yes. I've
                  been around.
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
          <div className="col-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category">Education</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Lazy
                  isn't
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
          <div className="col-4">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Awards</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Happy
                  times!
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
          <div className="col-6">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category">Projects</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> 763,215
                </h3>
              </div>
              <div className="card-body"></div>
            </div>
          </div>{" "}
          <div className="col-6">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> Other Projects</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> 763,215
                </h3>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card-chart card">
              <div className="card-header">
                <h5 className="card-category"> History in one</h5>
                <h3 className="card-title">
                  <i className="tim-icons icon-bell-55 text-info"></i> Timeline
                </h3>
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
