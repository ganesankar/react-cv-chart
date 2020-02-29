import { map as _map } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";
import Timeline from "react-visjs-timeline";

import moment from "moment";

export function getDate(tdate) {
  let p ='';
  if (tdate == "c" || tdate == "p") {
   p = moment(new Date()).format('YYYY-MM-DD')
  } 
   p = moment(tdate).format('YYYY-MM-DD');
    p =moment(tdate, ["DD/MM/YYYY"]).format('YYYY-MM-DD');
    // DateTime.fromFormat(tdates, 'dd/mm/yyyy').toFormat('YYYY-MM-DD');
   console.log('t', p)
    return p ;
  
}
class VisTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadOnce: false,
      notimeline: ["intro", "contacts", "social", "expertise", "profile"],
      contentdata: [],
      customTimes: {
        marker: new Date()
      },
      groups: [],
      options: {
        width: "100%",
        //height:  window.innerHeight,
        orientation: { axis: "top", item: "top" },
        zoomMax: 946080000000,
        zoomMin: 31536000000,
         max: new Date(),
        min: new Date("06/26/1987"),
        selectable: true
      },
      items: [
        {
          start: new Date("06/26/1987"),
          end: new Date("October 14, 2018 10:57:20"), // end is optional
          content: "fdfdf"
        },
        {
          id: "D",
          content: "Education",
          start: "1990-06-14",
          end: "2008-01-20",
          type: "background"
        },
        {
          id: "2ee",
          content: "Experience",
          start: "2009-05-25",
          end:  getDate('c'),
          type: "background"
        },
        {
          start: new Date("October 14, 2018 10:58:10"),
          end: new Date(), // end is optional
          content: "dfdf"
        }
      ]
    };
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps) {
    const { notimeline } = this.state;
    let { items } = this.state;
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
            console.log(" ") ;
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
                  end: getDate(itemx.enddate), // end is optional
                  content: itemx.name || itemx.title,
                  group: index,
                  className :item.type
                };
                if (item.type == 'skills') {
                  newI.type='point';
                  newI.content= `${itemx.name} : ${itemx.percentage}`;
                }
                items.push(newI);
                console.log("item", newI);
              });
            }
            groups.push(grpi);
          }
        });
        console.log("contentdata", contentdata);
        this.setState({ contentdata, groups, items });
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
    const { contentdata, options, items, customTimes, groups } = this.state;
    console.log("post", posts);
    return (
      <div>
        <Timeline
          selectHandler={this.selectHandler}
          options={options}
          items={items}
          groups={groups}
          customTimes={customTimes}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { fetchPosts })(VisTime);
